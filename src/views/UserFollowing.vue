<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="userName"
      :tweet-counts="tweetCounts"
    />
    <section class="container-body">
      <userTab />
      <user />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import userTab from './../components/userTab'
import user from './../components/user'

import { mapState } from 'vuex'

export default {
  name: 'UserFollowing',
  components: {
    navTopArrowTweetsCount,
    userTab,
    user
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
