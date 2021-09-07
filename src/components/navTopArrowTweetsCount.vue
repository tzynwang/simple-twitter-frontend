<template>
  <div class="nav-top">
    <button class="btn btn-arrow" @click="back">
      <img src="@/assets/images/navTopArrow-back.svg" alt="back to previous page button">
    </button>
    <div class="title">
      <div class="user-name">{{ userName }}</div>
      <div class="tweet-counts">{{ tweetCounts }} 推文</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navTopArrowTweetsCount',
  props: {
    userName: {
      type: String
    },
    tweetCounts: {
      type: String
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
