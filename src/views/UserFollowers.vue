<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="userName"
      :tweet-counts="tweetCounts"
    />
    <section class="container-body">
      <userTab />
      <user v-for="user in followers" :key="user.followerId" :initial-user="user" />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import userTab from './../components/userTab'
import user from './../components/user'

import userAPI from './../apis/user'

import { mapState } from 'vuex'
import { failToast } from './../utils/toasts'

export default {
  name: 'UserFollowers',
  components: {
    navTopArrowTweetsCount,
    userTab,
    user
  },
  data () {
    return {
      userName: '',
      tweetCounts: 0,
      followers: []
    }
  },
  computed: {
    ...mapState(['windowWidth'])
  },
  created () {
    const { userAccount } = this.$route.params
    this.fetchUser(userAccount)
    this.fetchUserFollowers(userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    const { userAccount } = to.params
    this.fetchUser(userAccount)
    this.fetchUserFollowers(userAccount)
    next()
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await userAPI.getUserById(userId)
        this.userName = data.name
        this.tweetCounts = data.totalTweets
      } catch (error) {
        failToast.fire({
          title: '無法取得使用者，請稍候再試'
        })
      }
    },
    async fetchUserFollowers (userId) {
      try {
        const { data } = await userAPI.getAllFollowers(userId)
        this.followers = data
      } catch (error) {
        failToast.fire({
          title: '無法取得跟隨者，請稍候再試'
        })
      }
    }
  }
}
</script>
