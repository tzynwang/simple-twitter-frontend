<template>
  <div class="nav-top">
    <button class="btn btn-arrow" @click="backToHome">
      <img src="@/assets/images/navTopArrow-back.svg" alt="back to previous page button">
    </button>
    <div class="title">
      <div class="user-name">{{ userName }}</div>
      <div class="tweet-counts">{{ tweetCounts }} 推文</div>
    </div>
  </div>
</template>

<script>
import { navMethods } from '@/utils/mixins'

export default {
  name: 'navTopArrowTweetsCount',
  mixins: [navMethods],
  props: ['userName', 'tweetCounts']
}
</script>

<style>
</style>
