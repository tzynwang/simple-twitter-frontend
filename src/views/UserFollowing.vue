<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="userName"
      :tweet-counts="tweetCounts"
    />
    <section class="container-body">
      <userTab />
      <user v-for="user in following" :key="user.followingId" :user="user" />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import userTab from './../components/userTab'
import user from './../components/user'

import { mapState } from 'vuex'

import userAPI from './../apis/user'
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
      fullPath: '',
      following: []
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
  },
  created () {
    const { userAccount } = this.$route.params
    this.fetchUserFollowing(userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    const { userAccount } = to.params
    this.fetchUserFollowing(userAccount)
    next()
  },
  methods: {
    async fetchUserFollowing (userId) {
      try {
        const { data } = await userAPI.getAllFollowing(userId)
        console.log(data)
        this.following = data
      } catch (error) {
        failToast.fire({
          title: '無法取得跟正在跟隨，請稍候再試'
        })
      }
    }
  }
}
</script>
