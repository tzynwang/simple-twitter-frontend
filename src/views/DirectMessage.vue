<template>
  <main class="container">
    <!-- mobile -->
    <template class="chat-room" v-if="windowWidth < 768">
      <div v-if="currentChatTo === null" class="text-center mt-30">
        選擇使用者開始聊天
      </div>
      <spinner v-else-if="isProcessing.message" />
      <template v-else>
        <navTop :user-from-parent="currentChatTo" />
        <section class="container-body container-message" ref="containerMessage">
          <div class="chat-display">
            <!-- 聊天訊息 -->
            <chatMessage
              v-for="message in messages"
              :key="message.id"
              :isMyMessage="message.user.id === getUser.id"
              :message="message"
            />
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
      </template>
      <navBottom :in-chat="1" />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeft v-if="windowWidth >= 768 && windowWidth < 1200" />
      <navLeftDesktop v-else />
      <section class="container-chat">
        <div class="online-list">
          <navTop :title-from-parent="'訊息'" />
          <spinner v-if="isProcessing.user" class="mt-60" />
          <div v-else-if="!users.length" class="text-center mt-60">目前無聊天對象</div>
          <section v-else class="container-body">
            <!-- 注意這邊的 br-2-primary 僅是為了展示所以設定條件為user.id === 1 -->
            <router-link :to="{ name: 'DirectMessage', query: { userId: user.user.id } }" :class="['chat-user', { 'br-2-primary': user.user.id === 1 }]" v-for="user in users" :key="user.user.id">
              <img
                :class="['avatar-img', 'ml-15', 'mr-10', 'mt-10', 'mb-15', { 'online': true }]"
                :src="user.user.avatar"
                alt="user avatar"
              />
              <div class="chat-user-account">
                <span class="mr-5">{{ user.user.name }}</span>
                <span>{{ user.user.account | userAccount }}</span>
                <div class="last-message">{{ user.massage }}</div>
              </div>
              <span class="last-update d-lg-none">
                {{ user.createdAt | dateToString }}
              </span>
            </router-link>
          </section>
        </div>
        <div class="chat-room">
          <div v-if="currentChatTo === null" class="text-center mt-30">選擇對象開始聊天</div>
          <spinner v-else-if="isProcessing.message" />
          <template v-else>
            <navTop :user-from-parent="currentChatTo" />
            <section class="container-body container-message" ref="containerMessage">
              <div v-if="!messages.length" class="text-center mt-30">目前無訊息</div>
              <div v-else class="chat-display">
                <!-- 聊天訊息 -->
                <chatMessage
                  v-for="message in messages"
                  :key="message.id"
                  :isMyMessage="message.Senders.id === getUser.id"
                  :message="message"
                />
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
          </template>
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

import userAPI from '@/apis/user'
import moment from 'moment'
import isLength from 'validator/lib/isLength'
import { mapState, mapGetters } from 'vuex'
import { accountStringFilter, fetchUserByIdInPathMixins } from '@/utils/mixins'
import { failToast } from '@/utils/toasts'

export default {
  name: 'DirectMessage',
  mixins: [accountStringFilter, fetchUserByIdInPathMixins],
  components: {
    navTop,
    navBottom,
    chatMessage,
    navLeft,
    navLeftDesktop,
    spinner
  },
  data () {
    return {
      currentChatTo: null,
      message: '',
      users: [],
      messages: [],
      roomId: -1,
      isProcessing: {
        user: true,
        message: true
      }
    }
  },
  created () {
    this.getChatMemberList()
    if (this.$route.fullPath === '/direct-message') return
    this.setCurrentChatTo(this.$route.query.userId)
    this.switchPrivateRoom(this.$route.query.userId)
  },
  beforeRouteUpdate (to, from, next) {
    this.getChatMemberList()
    if (to.fullPath === '/direct-message') {
      this.currentChatTo = null
      next()
      return
    }
    this.setCurrentChatTo(to.query.userId)
    this.switchPrivateRoom(to.query.userId)
    next()
  },
  mounted () {
    this.getNewMessage()
  },
  updated () {
    if (this.$route.fullPath === '/direct-message') return
    this.$nextTick(() => {
      this.scrollToMessageBottom()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.getSocket.emit('leave room')
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
      this.getSocket.emit('private message', this.message)
      // 發送完訊息後清空input，並自動focus回去
      this.message = ''
      this.$refs.chatInput.focus()

      this.scrollToMessageBottom()
    },
    getChatMemberList () {
      this.getSocket.emit('join private page')
      this.getSocket.on('chat member list', data => {
        this.isProcessing.user = true
        this.users = data
        this.isProcessing.user = false
      })
    },
    async setCurrentChatTo (userId) {
      try {
        const { data } = await userAPI.getUserById(userId)
        if (data.status !== '200') {
          throw new Error(data.message)
        }
        this.currentChatTo = data
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得使用者，請稍候再試'
        })
      }
    },
    switchPrivateRoom (userId) {
      if (this.roomId !== -1) {
        this.getSocket.emit('leave room')
        console.log('left', this.roomId)
        this.roomId = -1
      }
      this.getSocket.emit('join room', userId)
      this.getSocket.on('join room success', data => {
        console.log('joined', data)
        this.roomId = data
      })
      this.getSocket.on('history', data => {
        this.isProcessing.message = true
        this.messages = data
        this.isProcessing.message = false
      })
    },
    getNewMessage () {
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
        if (newMessage.Senders.id === this.currentChatTo.id || newMessage.Senders.id === this.getUser.id) {
          this.messages.push(newMessage)
        }
        // const index = this.users.findIndex(user => user.id === data.user.id)
        // this.users[index] = {
        //   ...this.users[index],
        //   massage: data.message.content,
        //   createdAt: data.message.createdAt
        // }
      })
    }
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUser', 'getUserByIdVuex', 'getSocket'])
  },
  filters: {
    dateToString (value) {
      if (!value) return '--'

      const today = new Date()
      const givenDate = new Date(value.split('.')[0])

      // 4小時內使用fromNow
      if ((today.getTime() - givenDate.getTime()) / 1000 < 14400) {
        return moment(givenDate).locale('zh-TW').fromNow()
      }

      if (today.toDateString() === givenDate.toDateString()) {
        return givenDate.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      return givenDate.toLocaleDateString('zh-TW', {
        year: '2-digit',
        month: 'long',
        day: 'numeric'
      })
        .slice(3)
    }
  }
}
</script>

<style></style>
