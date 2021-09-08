<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTopArrowTweetsCount
        :user-name="userName"
        :tweet-counts="tweetCounts"
      />
      <router-view class="container-body" />
      <navBottom />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <p>left nav</p>
      <router-view />
    </template>
    <template v-else>
      <p>left nav</p>
      <router-view />
      <p>right section</p>
    </template>
  </main>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import navBottom from './../components/navBottom'

import { mapState } from 'vuex'

export default {
  name: 'Portfolio',
  components: {
    navTopArrowTweetsCount,
    navBottom
  },
  created () {
    // get userId by route
    const { fullPath } = this.$route
    this.fullPath = fullPath
  },
  beforeRouteUpdate (to, from, next) {
    // get userId by route
    this.fullPath = to.fullPath
    next()
  },
  data () {
    return {
      fullPath: ''
    }
  },
  computed: {
    ...mapState(['windowWidth']),
    userName () {
      // TODO: get userName by userId
      return this.fullPath.split('/')[1]
    },
    tweetCounts () {
      // TODO: get user tweet counts by userId
      return 'xxxx'
    }
  }
}
</script>
