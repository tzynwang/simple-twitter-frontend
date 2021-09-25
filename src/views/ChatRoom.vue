<template>
  <main class="container">
    <!-- mobile -->
    <template class="chat-room" v-if="windowWidth < 768">
      <navTop :title-from-parent="'公開聊天室'" />
      <section class="container-body container-message">
        <div class="chat-display">
          <!-- 上線提示徽章 -->
          <div class="user-online-badge mb-15 text-center">
            <span>{{ users[1].name }} 上線</span>
          </div>
          <div class="user-online-badge mb-15 text-center">
            <span>{{ users[0].name }} 上線</span>
          </div>
          <!-- 聊天訊息 -->
          <chatMessage
            v-for="message in messages"
            :key="message.id"
            :isMyMessage="message.user.id === currentUser.id"
            :message="message"
          />
          <!-- 下線提示徽章 -->
          <div class="user-online-badge mb-15 text-center">
            <span>{{ users[0].name }} 下線</span>
          </div>
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
            <div class="chat-user" v-for="user in users" :key="user.id">
              <img
                class="avatar-img ml-15 mr-10 mt-10 mb-15"
                :src="user.avatar"
                alt="user avatar"
              />
              <div class="chat-user-account">
                <span class="mr-5">{{ user.name }}</span>
                <span>{{ user.account | userAccount }}</span>
              </div>
            </div>
          </section>
        </div>
        <div class="chat-room">
          <navTop :title-from-parent="'公開聊天室'" />
          <section class="container-body container-message">
            <div class="chat-display">
              <!-- 上線提示徽章 -->
              <div class="user-online-badge mb-15 text-center">
                <span>{{ users[1].name }} 上線</span>
              </div>
              <div class="user-online-badge mb-15 text-center">
                <span>{{ users[0].name }} 上線</span>
              </div>
              <!-- 聊天訊息 -->
              <chatMessage
                v-for="message in messages"
                :key="message.id"
                :isMyMessage="message.user.id === currentUser.id"
                :message="message"
              />
              <!-- 下線提示徽章 -->
              <div class="user-online-badge mb-15 text-center">
                <span>{{ users[0].name }} 下線</span>
              </div>
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
import { mapState } from 'vuex'
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
          createdAt: ''
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
          createdAt: ''
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
          createdAt: ''
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
          message:
            'hello from userId 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis scelerisque dolor, eu sodales justo. Aenean volutpat augue vitae lorem interdum, sodales efficitur ipsum consequat. Ut vel tellus velit. Nam imperdiet, purus quis blandit consectetur, quam sem ullamcorper est, ut efficitur metus risus vitae lectus. Cras vel ante id sapien porta consequat. Integer a lorem velit. Sed quis purus lorem. Pellentesque dignissim egestas ipsum non ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis scelerisque dolor, eu sodales justo. Aenean volutpat augue vitae lorem interdum, sodales efficitur ipsum consequat. Ut vel tellus velit. Nam imperdiet, purus quis blandit consectetur, quam sem ullamcorper est, ut efficitur metus risus vitae lectus. Cras vel ante id sapien porta consequat. Integer a lorem velit. Sed quis purus lorem. Pellentesque dignissim egestas ipsum non ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis scelerisque dolor, eu sodales justo. Aenean volutpat augue vitae lorem interdum, sodales efficitur ipsum consequat. Ut vel tellus velit. Nam imperdiet, purus quis blandit consectetur, quam sem ullamcorper est, ut efficitur metus risus vitae lectus. Cras vel ante id sapien porta consequat. Integer a lorem velit. Sed quis purus lorem. Pellentesque dignissim egestas ipsum non ornare.',
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
          message:
            'hello from userId 2 Aenean accumsan ut quam ut sollicitudin. Mauris eget sapien ac mi commodo pellentesque. Donec et velit tortor. Etiam pretium blandit metus non commodo. Morbi vehicula magna ut ipsum iaculis placerat. Sed quis velit eros. Morbi vulputate luctus ligula quis fermentum. Curabitur consectetur ultrices est sit amet mattis. Integer cursus, dolor tempus sodales tristique, dolor lorem viverra erat, at aliquam quam lorem at sapien. Curabitur eget commodo orci. Aenean accumsan ut quam ut sollicitudin. Mauris eget sapien ac mi commodo pellentesque. Donec et velit tortor. Etiam pretium blandit metus non commodo. Morbi vehicula magna ut ipsum iaculis placerat. Sed quis velit eros. Morbi vulputate luctus ligula quis fermentum. Curabitur consectetur ultrices est sit amet mattis. Integer cursus, dolor tempus sodales tristique, dolor lorem viverra erat, at aliquam quam lorem at sapien. Curabitur eget commodo orci.',
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
        },
        {
          id: 4,
          user: {
            id: 3,
            name: 'Esther Howard',
            email: 'apple@gmail.com',
            account: 'EthHowdy',
            cover: '',
            avatar: '',
            introduction: '',
            role: 'user',
            createdAt: ''
          },
          message: 'hello from userId 4',
          createdAt: '2021-09-24T08:34:27.000Z'
        }
      ]
    }
  },
  created () {
    // 進入公開聊天室
    this.socket.emit('join public', data => {
      console.log(data)
    })
  },
  mounted () {
    this.scrollToMessageBottom()
    // 取得線上使用者名單
    this.socket.on('online list', data => {
      console.log('list', data)
    })
    // 取得歷史訊息
    this.socket.on('history', data => {
      console.log('history', data)
    })
    // 有人上線或下線通知
    this.socket.on('connect status', data => {
      console.log(data)
    })
    // 新訊息通知
    this.socket.on('updated message', data => {
      console.log(data)
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
      // 測試用
      console.log('can send')
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
    getOnlineCounts () {
      // 取出現在上線的人數
      const onlineCount = this.users.length
      return `上線使用者（${onlineCount}）`
    }
  }
}
</script>

<style></style>
