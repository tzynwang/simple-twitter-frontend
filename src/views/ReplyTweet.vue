<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTopArrow />
      <section class="container-body">
        <tweetToReply />
        <replyInTweetPage v-for="(reply, index) in getRepliesInPage" :key="index" :reply="reply" />
      </section>
      <navBottom />
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <section class="container-body-tablet-desktop">
        <navTopArrow />
        <section class="container-body">
          <tweetToReply />
          <replyInTweetPage v-for="(reply, index) in getRepliesInPage" :key="index" :reply="reply" />
        </section>
      </section>
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
    </template>
    <template v-else>
      <navLeftDesktop />
      <section class="container-body-tablet-desktop">
        <navTopArrow />
        <section class="container-body">
          <tweetToReply />
          <replyInTweetPage v-for="(reply, index) in getRepliesInPage" :key="index" :reply="reply" />
        </section>
      </section>
      <popularList />
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
    </template>
  </main>
</template>

<script>
import navTopArrow from './../components/navTopArrow'
import navBottom from './../components/navBottom'
import tweetToReply from './../components/tweetToReply'
import replyInTweetPage from './../components/replyInTweetPage'
import addNewTweetModal from './../components/addNewTweetModal'
import replyTweetModal from './../components/replyTweetModal'

// tablet
import navLeft from './../components/navLeft'

// desktop
import navLeftDesktop from './../components/navLeftDesktop'
import popularList from './../components/popularList'

import { failToast } from '@/utils/toasts'
import tweetAPI from '@/apis/tweet'
// import userAPI from '@/apis/user'
import { fetchUserByIdInPathMixins } from '@/utils/mixins'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReplyTweet',
  mixins: [fetchUserByIdInPathMixins],
  components: {
    navTopArrow,
    navBottom,
    tweetToReply,
    replyInTweetPage,
    addNewTweetModal,
    replyTweetModal,
    navLeft,
    navLeftDesktop,
    popularList
  },
  created () {
    // 透過路由取推文id，再使用該推文id取得特定推文、以及該推文所有回覆內容
    const tweetId = this.$route.params.tweetId
    const userId = this.$route.params.userAccount
    this.getSingleTweet(tweetId)
    this.getSingleTweetReplies(tweetId)
    this.getUserById(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const tweetId = to.params.tweetId
    const userId = to.params.userAccount
    this.getSingleTweet(tweetId)
    this.getSingleTweetReplies(tweetId)
    this.getUserById(userId)
    next()
  },
  methods: {
    ...mapActions(['setTweetInPage', 'setRepliesInPage']),
    async getSingleTweet (tweetId) {
      try {
        const { data } = await tweetAPI.getTweet(tweetId)
        this.setTweetInPage(data)
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得回覆內容'
        })
      }
    },
    async getSingleTweetReplies (tweetId) {
      try {
        const { data } = await tweetAPI.getTweetAllReplies(tweetId)
        this.setRepliesInPage(data)
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得回覆內容'
        })
      }
    }
  },
  computed: {
    ...mapState(['windowWidth', 'openAddNewTweetModal', 'openReplyModal']),
    ...mapGetters(['getUser', 'getRepliesInPage']) // 回推、按讚時需要知道目前是哪一個使用者在操作
  }
}
</script>
