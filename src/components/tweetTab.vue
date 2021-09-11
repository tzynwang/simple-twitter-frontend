<template>
  <ul class="tweet-tab">
    <li>
      <router-link :to="{ name: 'UserAllTweets' }">推文</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'UserReplies' }">推文與回覆</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'UserLikes' }">喜歡的內容</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'tweetTab'
}
</script>

<style>

</style>
