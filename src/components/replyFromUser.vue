<template>
  <div class="tweet-component">
    <div class="tweet-component-avatar">
      <img
        class="avatar-img mt-18 ml-15 mr-10"
        :src="userAvatar"
        alt="user avatar"
      />
    </div>
    <div class="tweet-component-content pr-15">
      <div class="header mt-15">
        <span class="user-name mr-5">{{ userName }}</span>
        <span class="user-account">{{ userAccount | userAccount }}</span>
        <span class="time-stamp">{{ reply.createdAt | fromNow }}</span>
      </div>
      <div class="mt-4 text-gray">
        回覆
        <span class="text-primary">{{
          reply.Tweet.User.name | userAccount
        }}</span>
      </div>
      <div class="body mt-6 mb-15">
        {{ reply.comment }}
      </div>
    </div>
  </div>
</template>

<script>
import { accountStringFilter, timeFilter } from '@/utils/mixins'

export default {
  name: 'replyFromUser',
  mixins: [accountStringFilter, timeFilter],
  props: ['userName', 'userAccount', 'userAvatar', 'reply']
}
</script>

<style></style>
