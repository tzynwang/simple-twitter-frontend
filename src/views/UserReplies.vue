<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUserByIdVuex.name"
      :tweet-counts="getUserByIdVuex.totalTweets"
    />
    <section class="container-body">
      <userProfile :is-current-user="getUserByIdVuex.id === getUser.id" />
      <tweetTab />
      <spinner v-if="!fetchAllTweetsDone" />
      <replyFromUser
        v-else-if="userReplies.length"
        v-for="(reply, index) in userReplies"
        :key="index"
        :reply="reply"
        :user-id="getUserByIdVuex.id"
        :user-name="getUserByIdVuex.name"
        :user-account="getUserByIdVuex.account"
        :user-avatar="getUserByIdVuex.avatar"
      />
      <div v-else class="text-center mt-20">
        該使用者還沒有回覆過任何推文 ρ(・ω・、)
      </div>
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from '@/components/navTopArrowTweetsCount'
import userProfile from '@/components/userProfile'
import tweetTab from '@/components/tweetTab'
import replyFromUser from '@/components/replyFromUser'
import spinner from '@/components/spinner'

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
    replyFromUser,
    spinner
  },
  data () {
    return {
      userReplies: [],
      fetchAllTweetsDone: false
    }
  },
  created () {
    // 透過路由取id，再使用該id取得所有回覆內容
    this.getUserById(this.$route.params.userAccount)
    this.getCurrentUserReplies(this.$route.params.userAccount)
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
        this.fetchAllTweetsDone = true
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
    ...mapGetters(['getUserByIdVuex', 'getUser'])
  }
}
</script>
