<template>
  <section class="tweet-to-reply">
    <div class="header mt-15 mb-15 ml-15 mr-15">
      <img class="avatar-img mr-10" src="" alt="avatar">
      <div>
        <div class="user-name">userName</div>
        <div class="user-account">{{ "aUserAccount" | userAccount }}</div>
      </div>
    </div>
    <div class="body ml-15 mr-75">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iure vel mollitia reprehenderit dignissimos
      expedita aspernatur repudiandae non quo asperiores, ab fuga dolorum culpa tempora, suscipit officia sequi,
      explicabo modi.
    </div>
    <div class="time-stamp mt-15 mb-15 ml-15 mr-15">timeStamp</div>
    <div class="interaction-record ml-15 mr-15">
      <span class="mr-20">
        <span class="text-dark-700">{{ replyCounts }}</span> 回覆
      </span>
      <span>
        <span class="text-dark-700">{{ likeCounts }}</span> 喜歡次數
      </span>
    </div>
    <div class="interaction-action-container mt-18 ml-15 mr-15">
      <div class="reply mr-150 mb-10" @click="openReplyModal">
        <img src="@/assets/images/tweet-reply.svg" alt="tweet reply icon">
      </div>
      <div v-if="likedThisTweet" class="like mb-10">
        <img src="@/assets/images/tweet-liked-fill.svg" alt="tweet liked icon">
      </div>
      <div v-else class="like mb-10">
        <img src="@/assets/images/tweet-like.svg" alt="tweet like icon">
      </div>
    </div>
  </section>
</template>

<script>
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'tweetToReply',
  mixins: [accountStringFilter],
  data () {
    return {
      likedThisTweet: true,
      replyCounts: 34,
      likeCounts: 808
    }
  },
  methods: {
    openReplyModal () {
      this.$store.commit('toggleReplyModal')
    }
  }
}

</script>

<style>

</style>
