<template>
  <router-link
    class="tweet-component"
    :to="{ name: 'Tweet', params: { userAccount: user.id, tweetId: tweet.id } }"
  >
    <div class="tweet-component-avatar">
      <router-link
        :to="{ name: 'UserAllTweets', params: { userAccount: user.id } }"
      >
        <img
          class="avatar-img mt-13 ml-15 mr-10"
          :src="user.avatar"
          alt="user avatar"
        />
      </router-link>
    </div>
    <div class="tweet-component-content pr-15">
      <div class="header mt-10">
        <router-link
          :to="{ name: 'UserAllTweets', params: { userAccount: user.id } }"
          class="user-name mr-5"
          >{{ user.name }}</router-link
        >
        <span class="user-account">{{ user.account | userAccount }}</span>
        <span class="time-stamp">{{ tweet.createdAt | fromNow }}</span>
      </div>
      <div class="body mt-6">
        {{ tweet.description }}
      </div>
      <div class="footer mt-13 mb-10">
        <span
          class="icon-text-wrapper reply mr-50"
          @click.stop.prevent="replyTweet(tweet.id)"
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
          @click.stop.prevent="likeTweet({ action: -1, tweetId: tweet.id })"
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
          @click.stop.prevent="likeTweet({ action: 1, tweetId: tweet.id })"
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
  </router-link>
</template>

<script>
import { mapActions } from 'vuex'

import { accountStringFilter, timeFilter } from '@/utils/mixins'
import { failToast } from '@/utils/toasts'
import userAPI from '@/apis/user'

export default {
  name: 'tweetInUserAllTweets',
  mixins: [accountStringFilter, timeFilter],
  props: ['tweet', 'user'],
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    ...mapActions(['addLikeToTweetByUserId', 'removeLikeFromTweetByUserId']),
    replyTweet (tweetId) {
      // 回推時需要知道「回應哪一個推文」
      this.$store.commit('setReplyToTweetId', tweetId)
      // 打開回推用modal
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
            // 修改前端vuex userById中資料
            this.addLikeToTweetByUserId(tweetId)
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
            // 修改前端vuex userById中資料
            this.removeLikeFromTweetByUserId({ tweetId, from: 'tweets' })
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
