<template>
  <div class="tweet-component">
    <div class="tweet-component-avatar">
      <img class="avatar-img mt-13 ml-15 mr-10" src="" alt="user avatar" />
    </div>
    <div class="tweet-component-content">
      <div class="header mt-10">
        <span class="user-name mr-5">userName</span>
        <span class="user-account">{{ "aUserAccount" | userAccount }}</span>
        <span class="time-stamp">timeStamp</span>
      </div>
      <div class="body mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolorum
        corporis culpa cumque, ut dolorem voluptates assumenda temporibus
        laboriosam quae quibusdam fugiat vero amet omnis tenetur ea deserunt
        accusantium? Porro.
      </div>
      <div class="footer mt-13 mb-10">
        <span
          class="icon-text-wrapper reply mr-50"
          @click="replyTweet('tweet.id')"
        >
          <img
            class="mr-10"
            src="@/assets/images/tweet-reply.svg"
            alt="tweet reply icon"
          />
          <span>replyCounts</span>
        </span>
        <span
          v-if="likedThisTweet"
          class="icon-text-wrapper liked"
          @click="likeTweet({ action: -1, tweetId: 'tweet.id' })"
        >
          <img
            class="mr-10"
            src="@/assets/images/tweet-liked-fill.svg"
            alt="tweet liked icon"
          />
          <span>likedCounts</span>
        </span>
        <span
          v-else
          class="icon-text-wrapper like"
          @click="likeTweet({ action: 1, tweetId: 'tweet.id' })"
        >
          <img
            class="mr-10"
            src="@/assets/images/tweet-like.svg"
            alt="tweet like icon"
          />
          <span>likeCounts</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tweet',
  data () {
    return {
      likedThisTweet: false
    }
  },
  methods: {
    replyTweet (id) {
      console.log(id) // 測試用
      // 打開回推用modal
      // 發推文時需要知道「回應哪一個推文（需tweet.id）」
      // 回推成功後，被回的推文replyCouts要+1
    },
    likeTweet ({ action, tweetId }) {
      console.log(action, tweetId) // 測試用
      // action === 1 對該推文按讚
      // action === -1 收回對該推文的讚
    }
  },
  filters: {
    userAccount (account) {
      return `@${account}`
    }
  }
}
</script>

<style>
</style>
