<template>
  <section class="user">
    <div class="user-avatar mt-15 ml-15 mr-15">
      <img class="avatar-img" :src="user.avatar" alt="avatar">
    </div>
    <div class="user-content">
      <div class="header mt-4 mr-10">
        <div class="titles-container">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-account">{{ user.account | userAccount }}</div>
        </div>
        <div class="buttons-container">
          <button v-if="user.isFollowings" class="btn btn-primary btn-follow-25">
            正在跟隨
          </button>
          <button v-else class="btn btn-primary-outline btn-follow-25">
            跟隨
          </button>
        </div>
      </div>
      <div class="description mr-15">{{ user.introduction }}</div>
    </div>
  </section>
</template>

<script>
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'user',
  mixins: [accountStringFilter],
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
