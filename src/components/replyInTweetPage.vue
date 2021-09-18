<template>
  <div class="tweet-component">
    <div class="tweet-component-avatar">
      <router-link
        :to="{ name: 'UserAllTweets', params: { userAccount: reply.User.id } }"
      >
        <img
          class="avatar-img mt-18 ml-15 mr-10"
          :src="reply.User.avatar"
          alt="user avatar"
        />
      </router-link>
    </div>
    <div class="tweet-component-content pr-15">
      <div class="header mt-15">
        <router-link
          :to="{
            name: 'UserAllTweets',
            params: { userAccount: reply.User.id }
          }"
          class="user-name mr-5"
          >{{ reply.User.name }}</router-link
        >
        <span class="user-account">{{ reply.User.account | userAccount }}</span>
        <span class="time-stamp">{{ reply.updatedAt | fromNow }}</span>
      </div>
      <div class="mt-4 text-gray">
        回覆
        <router-link
          :to="{
            name: 'UserAllTweets',
            params: { userAccount: reply.User.id }
          }"
          class="text-primary"
          >{{ reply.User.name | userAccount }}</router-link
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
  name: 'replyInTweetPage',
  mixins: [accountStringFilter, timeFilter],
  props: ['reply']
}
</script>

<style></style>
