<template>
  <main class="container">
    <!-- mobile -->
    <template class="chat-room" v-if="windowWidth < 768">
      <navTop :title-from-parent="'公開聊天室'" />
      <section class="container-body container-message" ref="containerMessage">
        <div class="chat-display">
          <spinner v-if="isProcessing.message" />
          <div
            v-else-if="!messages.length"
            class="user-online-badge mb-15 text-center"
          >
            <span>還沒有任何聊天訊息 (ㆆᴗㆆ)</span>
          </div>
          <template v-else v-for="(message, index) in messages">
            <chatMessage
              v-if="message.Senders"
              :key="index"
              :isMyMessage="message.Senders.id === getUser.id"
              :message="message"
            />
            <div
              v-if="message.onlineHint"
              class="user-online-badge mb-15 text-center"
              :key="index"
            >
              <span>{{ message.onlineHint }}</span>
            </div>
          </template>
        </div>
        <form class="chat-send" @submit.prevent="handleSendMessage">
          <input
            class="ml-15 mt-10 mb-10"
            type="text"
            v-model.trim="message"
            ref="chatInput"
            placeholder="輸入訊息…"
          />
          <button class="btn">
            <img
              class="mr-15 ml-15"
              src="@/assets/images/chat-send.svg"
              alt="send message icon"
            />
          </button>
        </form>
      </section>
      <navBottom :in-chat="1" />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeft v-if="windowWidth >= 768 && windowWidth < 1200" />
      <navLeftDesktop v-else />
      <section class="container-chat">
        <div class="online-list">
          <navTop :title-from-parent="getOnlineCounts" />
          <section class="container-body">
            <spinner v-if="isProcessing.user" />
            <template v-else>
              <div class="chat-user" v-for="user in users" :key="user.UserId">
                <img
                  class="avatar-img ml-15 mr-10 mt-10 mb-15"
                  :src="user.User.avatar"
                  alt="user avatar"
                />
                <div class="chat-user-account">
                  <span class="mr-5">{{ user.User.name }}</span>
                  <span>{{ user.User.account | userAccount }}</span>
                </div>
              </div>
            </template>
          </section>
        </div>
        <div class="chat-room">
          <navTop :title-from-parent="'公開聊天室'" />
          <section
            class="container-body container-message"
            ref="containerMessage"
          >
            <div class="chat-display">
              <spinner v-if="isProcessing.message" />
              <div
                v-else-if="!messages.length"
                class="user-online-badge mb-15 text-center"
              >
                <span>還沒有任何聊天訊息 (ㆆᴗㆆ)</span>
              </div>
              <template v-else v-for="(message, index) in messages">
                <chatMessage
                  v-if="message.Senders"
                  :key="index"
                  :isMyMessage="message.Senders.id === getUser.id"
                  :message="message"
                />
                <div
                  v-if="message.onlineHint"
                  class="user-online-badge mb-15 text-center"
                  :key="index"
                >
                  <span>{{ message.onlineHint }}</span>
                </div>
              </template>
            </div>
            <form class="chat-send" @submit.prevent="handleSendMessage">
              <input
                class="ml-15 mt-10 mb-10"
                type="text"
                v-model.trim="message"
                ref="chatInput"
                placeholder="輸入訊息…"
              />
              <button class="btn">
                <img
                  class="mr-15 ml-15"
                  src="@/assets/images/chat-send.svg"
                  alt="send message icon"
                />
              </button>
            </form>
          </section>
        </div>
      </section>
    </template>
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import navBottom from '@/components/navBottom'
import chatMessage from '@/components/chatMessage'
import spinner from '@/components/spinner'

// tablet
import navLeft from '@/components/navLeft'

// desktop
import navLeftDesktop from '@/components/navLeftDesktop'

import isLength from 'validator/lib/isLength'
import { mapState, mapGetters } from 'vuex'
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'ChatRoom',
  mixins: [accountStringFilter],
  components: {
    navTop,
    navBottom,
    spinner,
    chatMessage,
    navLeft,
    navLeftDesktop
  },
  data () {
    return {
      message: '',
      totalUnread: '',
      users: [],
      messages: [],
      isProcessing: {
        user: true,
        message: true
      }
    }
  },
  created () {
    // 進入公開聊天室
    this.getSocket.emit('join public')

    this.getSocket.on('online list', data => {
      this.isProcessing.user = true
      this.users = data
      this.isProcessing.user = false
    })

    // 取得歷史訊息
    this.getSocket.on('history', data => {
      this.isProcessing.message = true
      this.messages = data
      this.isProcessing.message = false
    })

    // 上下線通知
    this.getSocket.on('connect status', data => {
      this.messages.push({ onlineHint: data })
    })

    // 新訊息通知
    this.getSocket.on('updated message', data => {
      const newMessage = {
        Senders: {
          avatar: data.user.avatar,
          id: data.user.id
        },
        content: data.message.content,
        createdAt: data.message.createdAt,
        id: data.message.id
      }
      this.messages.push(newMessage)
    })
  },
  mounted () {
    this.$refs.chatInput.focus()
  },
  updated () {
    this.$nextTick(() => {
      this.scrollToMessageBottom()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.getSocket.emit('leave public')
    window.alert('leave public')
    next()
  },
  methods: {
    scrollToMessageBottom () {
      this.$refs.containerMessage.scrollTop = this.$refs.containerMessage.scrollHeight
    },
    handleSendMessage () {
      if (!isLength(this.message, { min: 1 })) {
        return
      }
      // 向 server 端提交事件
      this.getSocket.emit('send message', this.message)
      // 發送完訊息後清空input，並自動focus回去
      this.message = ''
      this.$refs.chatInput.focus()

      this.scrollToMessageBottom()
    }
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUser', 'getSocket']),
    getOnlineCounts () {
      // 取出現在上線的人數
      const onlineCount = this.users.length
      return `上線使用者（${onlineCount}）`
    }
  }
}
</script>

<style></style>
