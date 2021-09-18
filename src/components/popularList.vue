<template>
  <ul class="popular-list">
    <li class="popular-list-title">Popular</li>

    <li
      v-for="user in getPopularUsers"
      :key="user.id"
      class="popular-list-user"
    >
      <router-link
        :to="{ name: 'UserAllTweets', params: { userAccount: user.id } }"
      >
        <img
          class="avatar-img mr-10 ml-15"
          :src="user.avatar"
          alt="user avatar"
        />
      </router-link>
      <div class="popular-list-user-info">
        <router-link
          :to="{ name: 'UserAllTweets', params: { userAccount: user.id } }"
          class="user-name"
          >{{ user.name }}</router-link
        >
        <div class="user-account">{{ user.account | userAccount }}</div>
      </div>
      <button
        v-if="user.id !== getUser.id && user.isFollowings"
        @click="follow({ user, action: -1 })"
        class="btn btn-primary btn-follow popular-list-user-follow"
      >
        正在跟隨
      </button>
      <button
        v-if="user.id !== getUser.id && !user.isFollowings"
        @click="follow({ user, action: 1 })"
        class="btn btn-primary-outline btn-follow popular-list-user-follow"
      >
        跟隨
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  accountStringFilter,
  fetchAllTweetsMixins,
  followingMixins
} from '@/utils/mixins'

export default {
  name: 'popularList',
  mixins: [accountStringFilter, fetchAllTweetsMixins, followingMixins],
  created () {
    this.fetchPopularUsers()
  },
  computed: {
    ...mapGetters(['getPopularUsers', 'getUser'])
  }
}
</script>

<style></style>
