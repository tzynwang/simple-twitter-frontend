<template>
  <section class="user">
    <router-link class="user-avatar mt-15 ml-15 mr-15" :to="{ name: 'UserAllTweets', params: { userAccount: user.id } }">
      <img class="avatar-img" :src="user.avatar" alt="avatar">
    </router-link>
    <div class="user-content">
      <div class="header mt-4 mr-10">
        <div class="titles-container">
          <router-link class="user-name" :to="{ name: 'UserAllTweets', params: { userAccount: user.id } }">{{ user.name }}</router-link>
          <div class="user-account">{{ user.account | userAccount }}</div>
        </div>
        <div v-show="user.id !== getUser.id" class="buttons-container">
          <button v-if="isFollowing" class="btn btn-primary btn-follow-25" @click="follow({ user, action: -1 })">
            正在跟隨
          </button>
          <button v-else class="btn btn-primary-outline btn-follow-25" @click="follow({ user, action: 1 })">
            跟隨
          </button>
        </div>
      </div>
      <div class="description mr-15">{{ user.introduction }}</div>
    </div>
  </section>
</template>

<script>
import { accountStringFilter, followingMixins } from '@/utils/mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'user',
  mixins: [accountStringFilter, followingMixins],
  props: ['initialUser'],
  data () {
    return {
      user: {
        ...this.initialUser,
        id: this.initialUser.followingId || this.initialUser.followerId
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getFollowing']),
    isFollowing () {
      const result = this.getFollowing.filter(user => user.followingId === this.user.id)
      return result.length ? result[0].isFollowings : false
    }
  }
}
</script>

<style>

</style>
