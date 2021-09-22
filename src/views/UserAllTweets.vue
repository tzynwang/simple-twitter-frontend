<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUserByIdVuex.name"
      :tweet-counts="getUserByIdVuex.totalTweets"
    />
    <section class="container-body" ref="tweetContainer">
      <userProfile :is-current-user="getUserByIdVuex.id === getUser.id" />
      <tweetTab />
      <spinner v-if="!fetchAllTweetsDone" />
      <tweetInUserAllTweets
        v-else-if="getTweetsByUserIdVuex.length"
        v-for="tweet in getTweetsByUserIdVuex"
        :key="tweet.id"
        :tweet="tweet"
        :user="getUserByIdVuex"
      />
      <div v-else class="text-center mt-20">
        該使用者還沒有發過推文 ( ˘•ω•˘ )
      </div>
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from '@/components/navTopArrowTweetsCount'
import userProfile from '@/components/userProfile'
import tweetTab from '@/components/tweetTab'
import tweetInUserAllTweets from '@/components/tweetInUserAllTweets'
import spinner from '@/components/spinner'

import {
  fetchAllTweetsMixins,
  fetchUserByIdInPathMixins
} from '@/utils/mixins'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UserAllTweets',
  mixins: [fetchAllTweetsMixins, fetchUserByIdInPathMixins],
  components: {
    navTopArrowTweetsCount,
    userProfile,
    tweetTab,
    tweetInUserAllTweets,
    spinner
  },
  data () {
    return {
      fetchAllTweetsDone: false
    }
  },
  created () {
    // 透過路由取id，比對id是否等於現在登入使用者的id，一致的話才顯示「編輯個人資料」按鈕
    this.getUserById(this.$route.params.userAccount)
    this.getAllTweetsByUserId(this.$route.params.userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    this.getUserById(to.params.userAccount)
    this.getAllTweetsByUserId(to.params.userAccount)
    next()
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getTweetsByUserIdVuex', 'getUserByIdVuex', 'getUser'])
  }
}
</script>
