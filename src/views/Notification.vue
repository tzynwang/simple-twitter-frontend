<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <router-view />
      <section class="container-body">
        <spinner v-if="isProcessing" />
        <div v-else-if="!allNotifications.length" class="text-center mt-30">
          目前沒有任何通知訊息 ꒡ꆚ꒡
        </div>
        <template v-else >
          <notification v-for="(notification, index) in allNotifications" :notification="notification" :key="index" />
        </template>
      </section>
      <navBottom />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body">
          <spinner v-if="isProcessing" />
          <div v-else-if="!allNotifications.length" class="text-center mt-30">
            目前沒有任何通知訊息 ꒡ꆚ꒡
          </div>
          <template v-else >
            <notification v-for="(notification, index) in allNotifications" :notification="notification" :key="index" />
          </template>
        </section>
      </section>
    </template>
    <template v-else>
      <navLeftDesktop />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body">
          <spinner v-if="isProcessing" />
          <div v-else-if="!allNotifications.length" class="text-center mt-30">
            目前沒有任何通知訊息 ꒡ꆚ꒡
          </div>
          <template v-else >
            <notification v-for="(notification, index) in allNotifications" :notification="notification" :key="index" />
          </template>
        </section>
      </section>
      <popularList />
    </template>
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import navBottom from '@/components/navBottom'
import notification from '@/components/notification'
import spinner from '@/components/spinner'

// tablet
import navLeft from '@/components/navLeft'

// desktop
import navLeftDesktop from '@/components/navLeftDesktop'
import popularList from '@/components/popularList'

import { mapState, mapGetters } from 'vuex'
import { io } from 'socket.io-client'

export default {
  name: 'Notification',
  components: {
    navTop,
    navBottom,
    navLeft,
    navLeftDesktop,
    notification,
    popularList,
    spinner
  },
  data () {
    return {
      socket: {},
      allNotifications: [],
      isProcessing: false
    }
  },
  created () {
    // 連線至socket server
    this.socket = io('https://socektfortest.herokuapp.com/', {
      query: {
        id: this.getUser.id,
        name: this.getUser.name,
        avatar: this.getUser.avatar,
        account: this.getUser.account
      }
    })

    // 測試用
    this.socket.on('connect', () => {
      console.log('socket connect')
      this.allNotifications = ['hello', 'world']
    })

    this.socket.on('all notification', data => {
      this.isProcessing = true
      this.allNotifications = [...data]
      console.log('all notification')
      this.isProcessing = false
    })
  },
  beforeDestroy () {
    this.socket.disconnect()
  },
  computed: {
    ...mapState(['windowWidth', 'openAddNewTweetModal']),
    ...mapGetters(['getUser'])
  }
}
</script>
