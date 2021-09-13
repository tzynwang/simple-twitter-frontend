<template>
  <section class="user-card mt-10">
    <div class="user-profile-image">
      <img class="profile-background-img" src="" alt="user profile background image">
      <div class="avatar-container">
        <img class="profile-avatar-img" src="" alt="avatar">
      </div>
    </div>
    <div class="user-profile-content">
      <div class="user-name mt-30">userName</div>
      <div class="user-account mt-4">{{ "aUserAccount" | userAccount }}</div>
      <div class="footer mt-15">
        <span class="icon-text-wrapper reply mr-10">
          <img class="mr-5" src="@/assets/images/tweet-reply.svg" alt="tweet reply icon">
          <span>1.5k</span>
        </span>
        <span class="icon-text-wrapper like">
          <img class="mr-5" src="@/assets/images/tweet-like.svg" alt="tweet like icon">
          <span>20k</span>
        </span>
      </div>
      <div class="follow-container mt-15">
        <span class="mr-5">
          <span class="text-dark">{{following}} 個</span>
          <span>跟隨中</span>
        </span>
        <span>
          <span class="text-dark">{{follower}} 位</span>
          <span>跟隨者</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'userCard',
  data () {
    return {
      following: 34,
      follower: 59,
      isCurrentUser: true,
      isFollowing: true
    }
  }
}
</script>

<style>

</style>
