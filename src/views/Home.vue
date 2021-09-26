<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body" ref="tweetContainer">
        <spinner v-if="!fetchAllTweetsDone" />
        <tweet v-else v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </section>
      <navBottom />
      <addNewTweetModal
        v-show="openAddNewTweetModal"
        @after-add-tweet="afterAddTweet"
      />
      <replyTweetModal v-show="openReplyModal" />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body" ref="tweetContainer">
          <addNewTweet @after-add-tweet="afterAddTweet" />
          <spinner v-if="!fetchAllTweetsDone" />
          <tweet
            v-else
            v-for="tweet in tweets"
            :key="tweet.id"
            :tweet="tweet"
          />
        </section>
      </section>
      <addNewTweetModal
        v-show="openAddNewTweetModal"
        @after-add-tweet="afterAddTweet"
      />
      <replyTweetModal v-show="openReplyModal" />
    </template>
    <template v-else>
      <navLeftDesktop />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body" ref="tweetContainer">
          <addNewTweet @after-add-tweet="afterAddTweet" />
          <spinner v-if="!fetchAllTweetsDone" />
          <tweet
            v-else
            v-for="tweet in tweets"
            :key="tweet.id"
            :tweet="tweet"
          />
        </section>
      </section>
      <popularList />
      <addNewTweetModal
        v-show="openAddNewTweetModal"
        @after-add-tweet="afterAddTweet"
      />
      <replyTweetModal v-show="openReplyModal" />
    </template>
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import navBottom from '@/components/navBottom'
import tweet from '@/components/tweet'
import addNewTweetModal from '@/components/addNewTweetModal'
import replyTweetModal from '@/components/replyTweetModal'
import spinner from '@/components/spinner'

// tablet
import navLeft from '@/components/navLeft'
import addNewTweet from '@/components/addNewTweet'

// desktop
import navLeftDesktop from '@/components/navLeftDesktop'
import popularList from '@/components/popularList'

import { fetchAllTweetsMixins } from '@/utils/mixins'

import { mapState, mapGetters } from 'vuex'

import { io } from 'socket.io-client'

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
    popularList,
    spinner
  },
  data () {
    return {
      fetchAllTweetsDone: false,
      tweets: [],
      start: 0,
      end: 10,
      tweetPerPage: 10,
      socket: {}
    }
  },
  computed: {
    ...mapState(['windowWidth', 'openAddNewTweetModal', 'openReplyModal']),
    ...mapGetters(['getUser', 'getTweets'])
  },
  created () {
    this.fetchAllTweets()
    this.fetchAllFollowing()
    this.fetchPopularUsers()

    this.socket = io('https://socektfortest.herokuapp.com/', {
      query: {
        id: this.getUser.id,
        name: this.getUser.name,
        avatar: this.getUser.avatar,
        account: this.getUser.account
      }
    })

    this.socket.on('connect', () => {
      console.log('---- socket connect ----')
      console.log(this.socket.id) // "G5p5..."
    })
  },
  mounted () {
    this.$refs.tweetContainer.addEventListener(
      'scroll',
      this.scrollBottomShowTweet
    )

    this.socket.on('total unread', (data) => {
      console.log('---- socket total unread ----')
      console.log(data)
    })

    this.socket.on('online user list', (data) => {
      console.log('---- socket online user list ----')
      console.log(data)
    })
  },
  beforeDestroy () {
    this.$refs.tweetContainer.removeEventListener(
      'scroll',
      this.scrollBottomShowTweet
    )
  },
  methods: {
    afterAddTweet (payload) {
      this.tweets.unshift(payload)
    }
  },
  watch: {
    fetchAllTweetsDone: function (value) {
      if (value) {
        this.sliceTweet(this.getTweets)
      }
    }
  }
}
</script>
