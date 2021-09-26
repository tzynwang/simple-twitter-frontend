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
            :isMyMessage="message.user.id === currentUser.id"
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
            <div :class="['chat-user', { 'br-2-primary': user.id === 1 }]" v-for="user in users" :key="user.id">
              <img
                :class="['avatar-img', 'ml-15', 'mr-10', 'mt-10', 'mb-15', { 'online': user.isOnline === true }]"
                :src="user.avatar"
                alt="user avatar"
              />
              <div class="chat-user-account">
                <span class="mr-5">{{ user.name }}</span>
                <span>{{ user.account | userAccount }}</span>
                <div class="last-message">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
              <span class="last-update d-lg-none">
                {{ user.messageLastUpdate | dateToString }}
              </span>
            </div>
          </section>
        </div>
        <div class="chat-room">
          <navTop :user-from-parent="currentChatTo" />
          <section class="container-body container-message">
            <div class="chat-display">
              <!-- 聊天訊息 -->
              <chatMessage
                v-for="message in messages"
                :key="message.id"
                :isMyMessage="message.user.id === currentUser.id"
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
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'DirectMessage',
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
      currentUser: {
        id: 2,
        name: 'Jane Cooper',
        email: 'Jan3Coo@gmail.com',
        account: 'Jan3Coo',
        cover: '',
        avatar: '',
        introduction: '',
        role: 'user',
        createdAt: ''
      },
      currentChatTo: {
        id: 2,
        name: 'Jane Cooper',
        email: 'Jan3Coo@gmail.com',
        account: 'Jan3Coo',
        cover: '',
        avatar: '',
        introduction: '',
        role: 'user',
        createdAt: ''
      },
      users: [
        {
          id: 1,
          name: 'Esther Howard',
          email: 'apple@gmail.com',
          account: 'EthHowdy',
          cover: '',
          avatar: '',
          introduction: '',
          role: 'user',
          createdAt: '',
          messageLastUpdate: '2021-09-06T08:19:27.000Z',
          isOnline: true
        },
        {
          id: 2,
          name: 'Jane Cooper',
          email: 'Jan3Coo@gmail.com',
          account: 'Jan3Coo',
          cover: '',
          avatar: '',
          introduction: '',
          role: 'user',
          createdAt: '',
          messageLastUpdate: '2021-09-14T08:23:27.000Z',
          isOnline: false
        },
        {
          id: 3,
          name: 'Esther Howard',
          email: 'apple@gmail.com',
          account: 'EthHowdy',
          cover: '',
          avatar: '',
          introduction: '',
          role: 'user',
          createdAt: '',
          messageLastUpdate: '2021-09-24T21:20:27.000Z',
          isOnline: true
        }
      ],
      messages: [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Esther Howard',
            email: 'apple@gmail.com',
            account: 'EthHowdy',
            cover: '',
            avatar: '',
            introduction: '',
            role: 'user',
            createdAt: ''
          },
          message: 'hello from userId 1',
          createdAt: '2021-09-16T08:23:27.000Z'
        },
        {
          id: 2,
          user: {
            id: 2,
            name: 'Jane Cooper',
            email: 'Jan3Coo@gmail.com',
            account: 'Jan3Coo',
            cover: '',
            avatar: '',
            introduction: '',
            role: 'user',
            createdAt: ''
          },
          message: 'hello from userId 2',
          createdAt: '2021-09-16T08:26:27.000Z'
        },
        {
          id: 3,
          user: {
            id: 1,
            name: 'Esther Howard',
            email: 'apple@gmail.com',
            account: 'EthHowdy',
            cover: '',
            avatar: '',
            introduction: '',
            role: 'user',
            createdAt: ''
          },
          message: 'hello from userId 1',
          createdAt: '2021-09-24T08:29:27.000Z'
        }
      ]
    }
  },
  mounted () {
    this.scrollToMessageBottom()
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
      // 測試用
      console.log('can send')

      // 發送完訊息後清空input，並自動focus回去
      this.message = ''
      this.$refs.chatInput.focus()

      this.scrollToMessageBottom()
    }
  },
  computed: {
    ...mapState(['windowWidth', 'socket']),
    ...mapGetters(['getUser'])
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
