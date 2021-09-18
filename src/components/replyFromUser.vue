<template>
  <div class="tweet-component">
    <div class="tweet-component-avatar">
      <router-link
        :to="{ name: 'UserAllTweets', params: { userAccount: userId } }"
      >
        <img
          class="avatar-img mt-18 ml-15 mr-10"
          :src="userAvatar"
          alt="user avatar"
        />
      </router-link>
    </div>
    <div class="tweet-component-content pr-15">
      <div class="header mt-15">
        <router-link
          :to="{ name: 'UserAllTweets', params: { userAccount: userId } }"
          class="user-name mr-5"
          >{{ userName }}</router-link
        >
        <span class="user-account">{{ userAccount | userAccount }}</span>
        <span class="time-stamp">{{ reply.createdAt | fromNow }}</span>
      </div>
      <div class="mt-4 text-gray">
        回覆
        <router-link
          :to="{
            name: 'UserAllTweets',
            params: { userAccount: reply.Tweet.User.id }
          }"
          class="text-primary"
          >{{ reply.Tweet.User.name | userAccount }}</router-link
        >
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
  props: ['userId', 'userName', 'userAccount', 'userAvatar', 'reply']
}
</script>

<style></style>
