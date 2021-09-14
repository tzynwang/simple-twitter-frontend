<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="userName"
      :tweet-counts="tweetCounts"
    />
    <section class="container-body">
      <userProfile />
      <tweetTab />
      <replyFromUser />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import userProfile from './../components/userProfile'
import tweetTab from './../components/tweetTab'
import replyFromUser from './../components/replyFromUser'

import { mapState } from 'vuex'

export default {
  name: 'UserReplies',
  components: {
    navTopArrowTweetsCount,
    userProfile,
    tweetTab,
    replyFromUser
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
