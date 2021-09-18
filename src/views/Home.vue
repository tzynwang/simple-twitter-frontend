<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <tweet v-for="tweet in getTweets" :key="tweet.id" :tweet="tweet" />
      </section>
      <navBottom />
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body">
          <addNewTweet />
          <tweet v-for="tweet in getTweets" :key="tweet.id" :tweet="tweet" />
        </section>
      </section>
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
    </template>
    <template v-else>
      <navLeftDesktop />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body">
          <addNewTweet />
          <tweet v-for="tweet in getTweets" :key="tweet.id" :tweet="tweet" />
        </section>
      </section>
      <popularList />
    </template>
    <addNewTweetModal v-show="openAddNewTweetModal" />
    <replyTweetModal v-show="openReplyModal" />
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import navBottom from '@/components/navBottom'
import tweet from '@/components/tweet'
import addNewTweetModal from '@/components/addNewTweetModal'
import replyTweetModal from '@/components/replyTweetModal'

// tablet
import navLeft from '@/components/navLeft'
import addNewTweet from '@/components/addNewTweet'

// desktop
import navLeftDesktop from '@/components/navLeftDesktop'
import popularList from '@/components/popularList'

import { fetchAllTweetsMixins } from '@/utils/mixins'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  mixins: [fetchAllTweetsMixins],
  components: {
    navTop,
    navBottom,
    tweet,
    addNewTweetModal,
    replyTweetModal,
    navLeft,
    addNewTweet,
    navLeftDesktop,
    popularList
  },
  computed: {
    ...mapState(['windowWidth', 'openAddNewTweetModal', 'openReplyModal']),
    ...mapGetters(['getTweets', 'getUser'])
  },
  created () {
    this.fetchAllTweets()
    this.fetchAllFollowing()
    this.fetchPopularUsers()
  }
}
</script>
