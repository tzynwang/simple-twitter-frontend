<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <tweet />
      </section>
      <navBottom />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body">
          <addNewTweet />
          <tweet />
        </section>
      </section>
    </template>
    <template v-else>
      <navLeftDesktop />
      <section class="container-body-tablet-desktop">
        <navTop />
        <section class="container-body">
          <addNewTweet />
          <tweet />
        </section>
      </section>
      <popularList />
    </template>
    <replyTweetModal v-show="openReplyModal" />
  </main>
</template>

<script>
import navTop from './../components/navTop'
import navBottom from './../components/navBottom'
import tweet from './../components/tweet'
import replyTweetModal from './../components/replyTweetModal'

// tablet
import navLeft from './../components/navLeft'
import addNewTweet from './../components/addNewTweet'

// desktop
import navLeftDesktop from './../components/navLeftDesktop'
import popularList from './../components/popularList'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    navTop,
    navBottom,
    tweet,
    replyTweetModal,
    navLeft,
    addNewTweet,
    navLeftDesktop,
    popularList
  },
  computed: {
    ...mapState(['windowWidth', 'openReplyModal'])
  }
}
</script>
