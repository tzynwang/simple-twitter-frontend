<template>
  <main class="container">
    <!-- mobile -->
    <template class="chat-room" v-if="windowWidth < 768">
      <navTop :user-from-parent="currentChatTo" />
      <section class="container-body container-message">
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
      <navBottom :in-chat="1" />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeft v-if="windowWidth >= 768 && windowWidth < 1200" />
      <navLeftDesktop v-else />
      <section class="container-chat">
        <div class="online-list">
          <navTop :title-from-parent="'訊息'" />
          <section class="container-body">
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
          <navTop :user-from-parent="currentChatTo" />
          <section class="container-body container-message">
            <div class="chat-display" v-show="currentChatTo.id !== -1">
              <!-- 聊天訊息 -->
              <chatMessage
                v-for="message in messages"
                :key="message.id"
                :isMyMessage="message.Senders.id === getUser.id"
                :message="message"
              />
            </div>
            <form v-show="currentChatTo.id !== -1" class="chat-send" @submit.prevent="handleSendMessage">
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

import moment from 'moment'
import isLength from 'validator/lib/isLength'
import { mapState, mapGetters } from 'vuex'
import { accountStringFilter, fetchUserByIdInPathMixins } from '@/utils/mixins'

import io from 'socket.io-client'

export default {
  name: 'DirectMessage',
  mixins: [accountStringFilter, fetchUserByIdInPathMixins],
  components: {
    navTop,
    navBottom,
    chatMessage,
    navLeft,
    navLeftDesktop
  },
  data () {
    return {
      currentChatTo: {
        id: -1,
        name: '',
        account: '',
        avatar: ''
      },
      message: '',
      // 假資料尚未拿掉
      users: [],
      messages: [],
      socket: {},
      roomId: -1
    }
  },
  created () {
    // 與 socket 連線
    this.connectSocket()
    // 進入私訊頁面
    this.socket.emit('join private page')
    // query 有 userId 的話進入與某使用者私訊頁面
    if (this.$route.query.userId) {
      this.socket.emit('join room', this.$route.query.userId)
      this.getUserById(this.$route.query.userId)
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.roomId !== -1) {
      this.socket.emit('leave room')
      this.roomId = -1
      console.log('leave room!')
    }
    this.socket.emit('join room', to.query.userId)
    this.getUserById(to.query.userId)
    next()
  },
  mounted () {
    this.scrollToMessageBottom()
    // 取得聊天清單
    this.socket.on('chat member list', data => {
      console.log(data)
      this.users = data
    })
    // 成功進入與某使用者私訊頁面
    this.socket.on('join room success', data => {
      this.roomId = data
      console.log('joined', this.roomId)
      this.currentChatTo = {
        id: this.getUserByIdVuex.id,
        name: this.getUserByIdVuex.name,
        account: this.getUserByIdVuex.account,
        avatar: this.getUserByIdVuex.avatar
      }
    })
    // 取得歷史訊息
    this.socket.on('history', data => {
      this.messages = data
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
  methods: {
    scrollToMessageBottom () {
      // F5畫面就不會自動捲到底
      const lastDiv = this.$el.querySelector('.chat-display>div:last-child')
      if (lastDiv) {
        lastDiv.scrollIntoView({ behavior: 'smooth' })
      }
    },
    handleSendMessage () {
      if (!isLength(this.message, { min: 1 })) {
        return
      }
      // 向 server 端提交事件
      this.socket.emit('private message', this.message)
      // 發送完訊息後清空input，並自動focus回去
      this.message = ''
      this.$refs.chatInput.focus()

      this.scrollToMessageBottom()
    },
    connectSocket () {
      this.socket = io('https://socektfortest.herokuapp.com/', {
        query: {
          id: this.getUser.id,
          name: this.getUser.name,
          avatar: this.getUser.avatar,
          account: this.getUser.account
        }
      })
    }
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUser', 'getUserByIdVuex'])
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
