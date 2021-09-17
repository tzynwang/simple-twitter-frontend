<template>
  <div class="tweet-component">
    <div class="tweet-component-avatar">
      <img
        class="avatar-img mt-13 ml-15 mr-10"
        :src="tweet.User.avatar"
        alt="user avatar"
      />
    </div>
    <div class="tweet-component-content pr-15">
      <div class="header mt-10">
        <span class="user-name mr-5">{{ tweet.User.name }}</span>
        <span class="user-account">{{ tweet.User.account | userAccount }}</span>
        <span class="time-stamp">{{ tweet.createdAt | fromNow }}</span>
      </div>
      <div class="body mt-6">
        {{ tweet.description }}
      </div>
      <div class="footer mt-13 mb-10">
        <span
          class="icon-text-wrapper reply mr-50"
          @click="replyTweet(tweet.TweetId)"
        >
          <img
            class="mr-10"
            src="@/assets/images/tweet-reply.svg"
            alt="tweet reply icon"
          />
          <span>{{ tweet.totalReplies }}</span>
        </span>
        <span
          v-if="tweet.isLiked"
          class="icon-text-wrapper liked"
          @click="likeTweet({ action: -1, tweetId: tweet.TweetId })"
        >
          <img
            class="mr-10"
            src="@/assets/images/tweet-liked-fill.svg"
            alt="tweet liked icon"
          />
          <span>{{ tweet.totalLikes }}</span>
        </span>
        <span
          v-else
          class="icon-text-wrapper like"
          @click="likeTweet({ action: 1, tweetId: tweet.TweetId })"
        >
          <img
            class="mr-10"
            src="@/assets/images/tweet-like.svg"
            alt="tweet like icon"
          />
          <span>{{ tweet.totalLikes }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { accountStringFilter, timeFilter } from '@/utils/mixins'
import { failToast } from './../utils/toasts'
import userAPI from './../apis/user'

import { mapActions } from 'vuex'

export default {
  name: 'tweetInUserLikes',
  mixins: [accountStringFilter, timeFilter],
  props: ['tweet'],
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    ...mapActions(['addLikeToTweetByUserId', 'removeLikeFromTweetByUserId']),
    replyTweet (tweetId) {
      // 打開回推用modal
      this.$store.commit('toggleReplyModal')
      // 回推時需要知道「回應哪一個推文」
      this.$store.commit('setReplyToTweetId', tweetId)
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
            this.addLikeToTweetByUserId({ tweetId, from: 'likes' })
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
            this.removeLikeFromTweetByUserId({ tweetId, from: 'likes' })
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
  watch: {
    tweet: function (newValue) {
      this.tweet = newValue
    }
  }
}
</script>

<style></style>
