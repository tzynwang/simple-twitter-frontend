<template>
  <div class="tweet-to-delete">
    <div class="tweet-to-delete-avatar">
      <img class="avatar-img mt-13 ml-15 mr-10" :src="tweet.User.avatar" alt="user avatar" />
    </div>
    <div class="tweet-to-delete-content pr-15">
      <div class="header mt-10">
        <span class="user-name mr-5">{{ tweet.User.name }}</span>
        <span class="user-account">{{ tweet.User.account | userAccount }}</span>
        <span class="time-stamp">{{ tweet.createdAt | fromNow }}</span>
      </div>
      <div class="body mt-6">{{ tweet.description | hideLetters }}</div>
    </div>
    <div class="tweet-to-delete-btn">
      <img class="mt-13 mr-15" src="@/assets/images/tweet-delete.svg" alt="tweet delete icon">
    </div>
  </div>
</template>

<script>
import { accountStringFilter, timeFilter } from '@/utils/mixins'

export default {
  name: 'tweetToDelete',
  mixins: [accountStringFilter, timeFilter],
  props: ['tweet'],
  filters: {
    hideLetters (tweetContent) {
      return tweetContent.slice(0, 49) + '...'
    }
  }
}
</script>

<style>

</style>
