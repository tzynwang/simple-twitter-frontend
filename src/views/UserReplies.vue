<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUserByIdVuex.name"
      :tweet-counts="getUserByIdVuex.totalTweets"
    />
    <section class="container-body">
      <userProfile />
      <tweetTab />
      <replyFromUser
        v-for="(reply, index) in userReplies"
        :key="index"
        :reply="reply"
        :user-name="getUserByIdVuex.name"
        :user-account="getUserByIdVuex.account"
        :user-avatar="getUserByIdVuex.avatar"
      />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import userProfile from './../components/userProfile'
import tweetTab from './../components/tweetTab'
import replyFromUser from './../components/replyFromUser'

import { failToast } from '@/utils/toasts'
import userAPI from '@/apis/user'
import {
  fetchAllTweetsMixins,
  fetchUserByIdInPathMixins
} from '@/utils/mixins'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UserReplies',
  mixins: [fetchAllTweetsMixins, fetchUserByIdInPathMixins],
  components: {
    navTopArrowTweetsCount,
    userProfile,
    tweetTab,
    replyFromUser
  },
  data () {
    return {
      userReplies: []
    }
  },
  created () {
    this.getUserById(this.$route.params.userAccount) // 透過currentPathId查詢該路由對應的使用者資料
    this.getCurrentUserReplies(this.$route.params.userAccount) // 透過currentPathId查詢該路由對應的使用者回覆內容
  },
  beforeRouteUpdate (to, from, next) {
    this.getUserById(to.params.userAccount)
    this.getCurrentUserReplies(to.params.userAccount)
    next()
  },
  methods: {
    async getCurrentUserReplies (userId) {
      try {
        const { data } = await userAPI.getAllRepliesById(userId)
        this.userReplies = data
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得推文，請稍候再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUserByIdVuex'])
  }
}
</script>
