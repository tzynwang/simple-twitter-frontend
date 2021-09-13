<template>
  <div class="tweet-to-delete">
    <div class="tweet-to-delete-avatar">
      <img class="avatar-img mt-13 ml-15 mr-10" src="" alt="user avatar" />
    </div>
    <div class="tweet-to-delete-content pr-15">
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
    </div>
    <div class="tweet-to-delete-btn">
      <img class="mt-13 mr-15" src="@/assets/images/tweet-delete.svg" alt="tweet delete icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'tweetToDelete'
}
</script>

<style>

</style>
