<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUser.name"
      :tweet-counts="getCurrentUserTweets.length"
    />
    <section class="container-body">
      <userProfile />
      <tweetTab />
      <replyFromUser
        v-for="(reply, index) in userReplies"
        :key="index"
        :reply="reply"
        :user-name="getUser.name"
        :user-account="getUser.account"
        :user-avatar="getUser.avatar"
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
import { fetchAllTweetsMixins } from '@/utils/mixins'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UserReplies',
  mixins: [fetchAllTweetsMixins],
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
    // 為了取使用者的推文數量，必定需要取全部的推文
    this.fetchAllTweets()
    this.getCurrentUserReplies()
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchAllTweets()
    this.getCurrentUserReplies()
    next()
  },
  methods: {
    async getCurrentUserReplies () {
      try {
        const { data } = await userAPI.getCurrentUserRepliedTweets(
          this.getUser.id
        )
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
    ...mapGetters(['getCurrentUserTweets', 'getUser'])
  }
}
</script>
