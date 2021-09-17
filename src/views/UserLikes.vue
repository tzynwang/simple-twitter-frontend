<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUser.name"
      :tweet-counts="getCurrentUserTweets.length"
    />
    <section class="container-body">
      <userProfile />
      <tweetTab />
      <tweet
        v-for="tweet in getCurrentUserLikedTweets"
        :key="tweet.id"
        :tweet="tweet"
      />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from './../components/navTopArrowTweetsCount'
import userProfile from './../components/userProfile'
import tweetTab from './../components/tweetTab'
import tweet from './../components/tweet'

import { mapState, mapGetters } from 'vuex'

import { fetchAllTweetsMixins } from '@/utils/mixins'

export default {
  name: 'UserLikes',
  mixins: [fetchAllTweetsMixins],
  components: {
    navTopArrowTweetsCount,
    userProfile,
    tweetTab,
    tweet
  },
  created () {
    // get all tweets
    this.fetchAllTweets()
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchAllTweets()
    next()
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters([
      'getCurrentUserTweets',
      'getCurrentUserLikedTweets',
      'getUser'
    ])
  }
}
</script>
