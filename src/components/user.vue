<template>
  <section class="user">
    <router-link class="user-avatar mt-15 ml-15 mr-15" :to="{ name: 'UserAllTweets', params: { userAccount: userId } }">
      <img class="avatar-img" :src="user.avatar" alt="avatar">
    </router-link>
    <div class="user-content">
      <div class="header mt-4 mr-10">
        <div class="titles-container">
          <router-link class="user-name" :to="{ name: 'UserAllTweets', params: { userAccount: userId } }">{{ user.name }}</router-link>
          <div class="user-account">{{ user.account | userAccount }}</div>
        </div>
        <div v-show="userId !== getUser.id" class="buttons-container">
          <button v-if="user.isFollowings" class="btn btn-primary btn-follow-25" @click="follow({ id: userId, action: -1 })">
            正在跟隨
          </button>
          <button v-else class="btn btn-primary-outline btn-follow-25" @click="follow({ id: userId, action: 1 })">
            跟隨
          </button>
        </div>
      </div>
      <div class="description mr-15">{{ user.introduction }}</div>
    </div>
  </section>
</template>

<script>
import userAPI from './../apis/user'
import { accountStringFilter, followingMixins } from '@/utils/mixins'
import { failToast } from './../utils/toasts'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'user',
  mixins: [accountStringFilter, followingMixins],
  props: ['initialUser'],
  data () {
    return {
      user: this.initialUser,
      userId: this.initialUser.followingId || this.initialUser.followerId
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapActions(['togglePopularUsersFollowStatus']),
    async follow ({ id, action }) {
      switch (action) {
        case 1:
          try {
            const { data } = await userAPI.startFollow({ id })
            if (data.status !== '200') throw new Error(data.message)

            this.user = {
              ...this.user,
              isFollowings: true
            }

            this.togglePopularUsersFollowStatus(id)
          } catch (error) {
            failToast.fire({
              title: '無法跟隨該使用者'
            })
          }
          break
        case -1:
          try {
            const { data } = await userAPI.stopFollow(id)
            if (data.status !== '200') throw new Error(data.message)

            this.user = {
              ...this.user,
              isFollowings: false
            }

            this.togglePopularUsersFollowStatus(id)
          } catch (error) {
            failToast.fire({
              title: '無法取消跟隨該使用者'
            })
          }
      }
    }
  }
}
</script>

<style>

</style>
