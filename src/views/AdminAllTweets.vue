<template>
  <main class="container">
    <!-- mobile -->
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <tweetToDelete v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </section>
      <navBottomAdmin />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeftAdmin v-if="windowWidth >= 768 && windowWidth < 1200"/>
      <navLeftDesktopAdmin v-else />
      <section class="container-body-column-merge">
        <navTop />
        <section class="container-body">
          <tweetToDelete v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" @after-delete-tweet="afterDeleteTweet" />
        </section>
      </section>
    </template>
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import tweetToDelete from '@/components/tweetToDelete'
import navBottomAdmin from '@/components/navBottomAdmin'
import navLeftAdmin from '@/components/navLeftAdmin'
import navLeftDesktopAdmin from '@/components/navLeftDesktopAdmin'
import tweetAPI from '@/apis/tweet'

import { mapState } from 'vuex'
import { failToast } from '@/utils/toasts'

export default {
  name: 'AdminAllTweets',
  components: {
    navTop,
    tweetToDelete,
    navBottomAdmin,
    navLeftAdmin,
    navLeftDesktopAdmin
  },
  data () {
    return {
      tweets: []
    }
  },
  computed: {
    ...mapState(['windowWidth'])
  },
  created () {
    this.fetchAdminAllTweets()
  },
  methods: {
    async fetchAdminAllTweets () {
      try {
        const { data } = await tweetAPI.getAdminAllTweets()
        this.tweets = data.tweets
      } catch (error) {
        failToast.fire({
          title: '無法取得推文清單，請稍候再試'
        })
      }
    },
    async afterDeleteTweet (tweetId) {
      try {
        const { data } = await tweetAPI.deleteTweet(tweetId)
        if (data.status !== 'success') throw new Error(data.message)
        this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId)
      } catch (error) {
        failToast.fire({
          title: '無法刪除推文，請稍候再試'
        })
      }
    }
  }
}
</script>

<style>

</style>
