<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="userName"
      :tweet-counts="tweetCounts"
    />
    <section class="container-body">
      <userTab />
      <user v-for="user in following" :key="user.followingId" :initial-user="user" />
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
  name: 'UserFollowing',
  components: {
    navTopArrowTweetsCount,
    userTab,
    user
  },
  data () {
    return {
      userName: '',
      tweetCounts: 0,
      following: []
    }
  },
  computed: {
    ...mapState(['windowWidth'])
  },
  created () {
    const { userAccount } = this.$route.params
    this.fetchUser(userAccount)
    this.fetchUserFollowing(userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    const { userAccount } = to.params
    this.fetchUser(userAccount)
    this.fetchUserFollowing(userAccount)
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
    async fetchUserFollowing (userId) {
      try {
        const { data } = await userAPI.getAllFollowing(userId)
        this.following = data
      } catch (error) {
        failToast.fire({
          title: '無法取得正在跟隨，請稍候再試'
        })
      }
    }
  }
}
</script>
