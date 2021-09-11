<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTopArrow />
      <section class="container-body">
        <tweetToReply />
        <replyFromUser />
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
          <replyFromUser />
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
          <replyFromUser />
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
import replyFromUser from './../components/replyFromUser'
import addNewTweetModal from './../components/addNewTweetModal'
import replyTweetModal from './../components/replyTweetModal'

// tablet
import navLeft from './../components/navLeft'

// desktop
import navLeftDesktop from './../components/navLeftDesktop'
import popularList from './../components/popularList'

import { mapState } from 'vuex'

export default {
  name: 'ReplyTweet',
  components: {
    navTopArrow,
    navBottom,
    tweetToReply,
    replyFromUser,
    addNewTweetModal,
    replyTweetModal,
    navLeft,
    navLeftDesktop,
    popularList
  },
  computed: {
    ...mapState(['windowWidth', 'openAddNewTweetModal', 'openReplyModal'])
  }
}
</script>
