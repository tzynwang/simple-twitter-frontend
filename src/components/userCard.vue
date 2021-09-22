<template>
  <section class="user-card">
    <div class="user-profile-image">
      <img class="profile-background-img" :src="user.cover" alt="user profile background image">
      <div class="avatar-container">
        <img class="profile-avatar-img" :src="user.avatar" alt="avatar">
      </div>
    </div>
    <div class="user-profile-content">
      <div class="user-name mt-30">{{ user.name }}</div>
      <div class="user-account mt-4">{{ user.account | userAccount }}</div>
      <div class="footer mt-15">
        <span class="icon-text-wrapper reply mr-10">
          <img class="mr-5" src="@/assets/images/tweet-reply.svg" alt="tweet reply icon">
          <span>{{ user.tweetsCount }}</span>
        </span>
        <span class="icon-text-wrapper like">
          <img class="mr-5" src="@/assets/images/tweet-like.svg" alt="tweet like icon">
          <span>{{ user.likesCount }}</span>
        </span>
      </div>
      <div class="follow-container mt-15">
        <span class="mr-5">
          <span class="text-dark">{{ user.followingsCount }} 個</span>
          <span>跟隨中</span>
        </span>
        <span>
          <span class="text-dark">{{ user.followersCount }} 位</span>
          <span>跟隨者</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'userCard',
  mixins: [accountStringFilter],
  props: ['user']
}
</script>

<style>

</style>
