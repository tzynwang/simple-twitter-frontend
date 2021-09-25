<template>
  <main class="container">
    <!-- mobile -->
    <template class="chat-room" v-if="windowWidth < 768">
      <navTop :title-from-parent="'公開聊天室'" />
      <section class="container-body container-message" ref="containerMessage">
        <div class="chat-display">
          <!-- 上線提示徽章 -->
          <!-- <div class="user-online-badge mb-15 text-center">
            <span>使用者1上線</span>
          </div>
          <div class="user-online-badge mb-15 text-center">
            <span>使用者2上線</span>
          </div> -->
          <!-- 聊天訊息 -->
          <chatMessage
            v-for="message in messages"
            :key="message.id"
            :isMyMessage="message.Senders.id === getUser.id"
            :message="message"
          />
          <!-- 下線提示徽章 -->
          <!-- <div class="user-online-badge mb-15 text-center">
            <span>使用者1下線</span>
          </div> -->
        </div>
        <form class="chat-send" @submit.prevent="handleSendMessage">
          <input
            class="ml-15 mt-10 mb-10"
            type="text"
            v-model.trim="message"
            ref="chatInput"
            placeholder="輸入訊息…"
            autofocus
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
          </section>
        </div>
        <div class="chat-room">
          <navTop :title-from-parent="'公開聊天室'" />
          <section class="container-body container-message" ref="containerMessage">
            <div class="chat-display">
              <!-- 上線提示徽章 -->
              <!-- <div class="user-online-badge mb-15 text-center">
                <span>使用者1上線</span>
              </div>
              <div class="user-online-badge mb-15 text-center">
                <span>使用者2上線</span>
              </div> -->
              <!-- 聊天訊息 -->
              <chatMessage
                v-for="message in messages"
                :key="message.id"
                :isMyMessage="message.Senders.id === getUser.id"
                :message="message"
              />
              <!-- 下線提示徽章 -->
              <!-- <div class="user-online-badge mb-15 text-center">
                <span>使用者1下線</span>
              </div> -->
            </div>
            <form class="chat-send" @submit.prevent="handleSendMessage">
              <input
                class="ml-15 mt-10 mb-10"
                type="text"
                v-model.trim="message"
                ref="chatInput"
                placeholder="輸入訊息…"
                autofocus
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
    chatMessage,
    navLeft,
    navLeftDesktop
  },
  data () {
    return {
      message: '',
      users: [],
      messages: []
    }
  },
  created () {
    // 進入公開聊天室
    this.socket.emit('join public')
    // 取得線上使用者名單
    this.socket.on('online list', data => {
      this.users = data
    })
    // 取得歷史訊息
    this.socket.on('history', data => {
      this.messages = data
    })
  },
  mounted () {
    // 有人上線或下線通知，有bug待討論
    this.socket.on('connect status', data => {
      console.log(data)
    })
    // 新訊息通知
    this.socket.on('updated message', data => {
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
  updated () {
    this.$nextTick(() => {
      this.scrollToMessageBottom()
    })
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
      this.socket.emit('send message', this.message)
      // 發送完訊息後清空input，並自動focus回去
      this.message = ''
      this.$refs.chatInput.focus()

      this.scrollToMessageBottom()
    }
  },
  computed: {
    ...mapState(['windowWidth', 'socket']),
    ...mapGetters(['getUser']),
    getOnlineCounts () {
      // 取出現在上線的人數
      const onlineCount = this.users.length
      return `上線使用者（${onlineCount}）`
    }
  }
}
</script>

<style></style>
