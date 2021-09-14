<template>
  <ul class="user-tab">
    <li>
      <router-link :to="{ name: 'UserFollowers' }">跟隨者</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'UserFollowing' }">正在跟隨</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'userTab'
}
</script>

<style>

</style>
