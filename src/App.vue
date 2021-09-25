<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      socket: {}
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getToken', 'getAuthenticated'])
  },
  created () {
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)

    // 在登入的狀態下才與 socket 建立連線
    if (this.getAuthenticated) {
      this.socket = io('https://c60e-27-240-218-37.ngrok.io', {
        query: {
          id: this.getUser.id,
          name: this.getUser.name,
          avatar: this.getUser.avatar,
          account: this.getUser.account
        }
      })
      console.log('socket ok')
    }
    console.log(this.socket)
  },
  destroyed () {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  methods: {
    getWindowWidth () {
      this.$store.commit('setWindowWidth', window.innerWidth)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss'
</style>
