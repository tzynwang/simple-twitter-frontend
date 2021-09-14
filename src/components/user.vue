<template>
  <section class="user">
    <div class="user-avatar mt-15 ml-15 mr-15">
      <img class="avatar-img" src="" alt="avatar">
    </div>
    <div class="user-content">
      <div class="header mt-4 mr-10">
        <div class="titles-container">
          <div class="user-name">userName</div>
          <div class="user-account">{{ "aUserAccount" | userAccount }}</div>
        </div>
        <div class="buttons-container">
          <button v-if="isFollowing" class="btn btn-primary btn-follow-25">
            正在跟隨
          </button>
          <button v-else class="btn btn-primary-outline btn-follow-25">
            跟隨
          </button>
        </div>
      </div>
      <div class="description mr-15">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam quidem magni sapiente, deleniti hic numquam et
        corrupti perferendis.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      isFollowing: true
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
