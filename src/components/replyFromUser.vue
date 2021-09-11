<template>
  <div class="tweet-component">
    <div class="tweet-component-avatar">
      <img class="avatar-img mt-18 ml-15 mr-10" src="" alt="user avatar" />
    </div>
    <div class="tweet-component-content pr-15">
      <div class="header mt-15">
        <span class="user-name mr-5">userName</span>
        <span class="user-account">{{ "aUserAccount" | userAccount }}</span>
        <span class="time-stamp">timeStamp</span>
      </div>
      <div class="mt-4 text-gray">
        回覆 <span class="text-primary">{{ "aUserAccount" | userAccount }}</span>
      </div>
      <div class="body mt-6 mb-15">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolorum
        corporis culpa cumque, ut dolorem voluptates assumenda temporibus
        laboriosam quae quibusdam fugiat vero amet omnis tenetur ea deserunt
        accusantium? Porro.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'replyFromUser',
  filters: {
    userAccount (account) {
      return `@${account}`
    }
  }
}
</script>

<style>

</style>
