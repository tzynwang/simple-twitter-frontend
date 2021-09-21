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
      <tweetInUserLikes
        v-else-if="getLikesByUserIdVuex.length"
        v-for="tweet in getLikesByUserIdVuex"
        :key="tweet.TweetId"
        :tweet="tweet"
      />
      <div v-else class="text-center mt-30">
        該使用者目前沒有任何喜歡的推文 ( ´•̥×•̥` )
      </div>
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from '@/components/navTopArrowTweetsCount'
import userProfile from '@/components/userProfile'
import tweetTab from '@/components/tweetTab'
import tweetInUserLikes from '@/components/tweetInUserLikes'
import spinner from '@/components/spinner'

import {
  fetchAllTweetsMixins,
  fetchUserByIdInPathMixins
} from '@/utils/mixins'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UserLikes',
  mixins: [fetchAllTweetsMixins, fetchUserByIdInPathMixins],
  components: {
    navTopArrowTweetsCount,
    userProfile,
    tweetTab,
    tweetInUserLikes,
    spinner
  },
  data () {
    return {
      currentPathId: -1,
      fetchAllTweetsDone: false
    }
  },
  created () {
    // 透過路由取id，再使用該id取得所有讚過的推文
    this.getUserById(this.$route.params.userAccount)
    this.getAllLikesByUserId(this.$route.params.userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    this.getUserById(to.params.userAccount)
    this.getAllLikesByUserId(to.params.userAccount)
    next()
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getLikesByUserIdVuex', 'getUserByIdVuex', 'getUser'])
  }
}
</script>
