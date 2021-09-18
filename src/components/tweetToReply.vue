<template>
  <section class="tweet-to-reply">
    <div class="header mt-15 mb-15 ml-15 mr-15">
      <img class="avatar-img mr-10" :src="getUserByIdVuex.avatar" alt="avatar">
      <div>
        <div class="user-name">{{ getUserByIdVuex.name }}</div>
        <div class="user-account">{{ getUserByIdVuex.account | userAccount }}</div>
      </div>
    </div>
    <div class="body ml-15 mr-75">
      {{ getTweetInPage.description }}
    </div>
    <div class="time-stamp mt-15 mb-15 ml-15 mr-15">{{ getTweetInPage.updatedAt }}</div>
    <div class="interaction-record ml-15 mr-15">
      <span class="mr-20">
        <span class="text-dark-700">{{ getTweetInPage.totalReply }}</span> 回覆
      </span>
      <span>
        <span class="text-dark-700">{{ getTweetInPage.totalLike }}</span> 喜歡次數
      </span>
    </div>
    <div class="interaction-action-container mt-18 ml-15 mr-15">
      <div class="reply mr-150 mb-10" @click="openReplyModal">
        <img src="@/assets/images/tweet-reply.svg" alt="tweet reply icon">
      </div>
      <div v-if="getTweetInPage.isLiked" class="like mb-10" @click="likeTweet({ action: -1, tweetId: getTweetInPage.id })">
        <img src="@/assets/images/tweet-liked-fill.svg" alt="tweet liked icon">
      </div>
      <div v-else class="like mb-10" @click="likeTweet({ action: 1, tweetId: getTweetInPage.id })">
        <img src="@/assets/images/tweet-like.svg" alt="tweet like icon">
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { accountStringFilter } from '@/utils/mixins'
import { failToast } from '@/utils/toasts'
import userAPI from '@/apis/user'

export default {
  name: 'tweetToReply',
  mixins: [accountStringFilter],
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    ...mapActions(['addLikeToTweetInPage', 'removeLikeFromTweetInPage']),
    openReplyModal () {
      this.$store.commit('toggleReplyModal')
    },
    async likeTweet ({ action, tweetId }) {
      if (this.isProcessing) return
      switch (action) {
        case 1: {
          // 對該推文按讚
          try {
            // 通知後端
            this.isProcessing = true
            const { data } = await userAPI.addLikeToTweet(tweetId)
            if (data.status !== '200') {
              throw new Error(data.message)
            }
            // 修改前端vuex中資料
            this.addLikeToTweetInPage()
            this.isProcessing = false
          } catch (error) {
            console.error(error)
            failToast.fire({
              title: '無法對該推文按讚'
            })
            this.isProcessing = false
          }
          break
        }
        case -1: // 收回對該推文的讚
          try {
            // 通知後端
            this.isProcessing = true
            const { data } = await userAPI.removeLikeFromTweet(tweetId)
            if (data.status !== '200') {
              throw new Error(data.message)
            }
            // 修改前端vuex中資料
            this.removeLikeFromTweetInPage()
            this.isProcessing = false
          } catch (error) {
            console.error(error)
            failToast.fire({
              title: '無法對該推文收回讚'
            })
            this.isProcessing = false
          }
      }
    }
  },
  computed: {
    ...mapGetters(['getTweetInPage', 'getUserByIdVuex'])
  }
}

</script>

<style>

</style>
