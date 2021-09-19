<template>
  <section class="user-profile">
    <!-- image area -->
    <div class="modal-body user-profile-image">
      <img
        class="profile-background-img"
        :src="getUserByIdVuex.cover"
        alt="user profile background image"
      />
      <div class="avatar-container">
        <img
          class="profile-avatar-img"
          :src="getUserByIdVuex.avatar"
          alt="avatar"
        />
      </div>
    </div>
    <!-- text area -->
    <div>
      <div class="buttons-container text-right">
        <button
          v-if="isCurrentUser"
          class="btn btn-primary-outline btn-profile-action mt-10 mr-15"
          @click.stop.prevent="editProfile"
        >
          編輯個人資料
        </button>
        <button
          v-else-if="isFollowing"
          class="btn btn-primary btn-profile-action mt-10 mr-15"
          @click.stop.prevent="follow({ user: getUserByIdVuex, action: -1})"
        >
          正在跟隨
        </button>
        <button
          v-else
          class="btn btn-primary-outline btn-profile-action mt-10 mr-15"
          @click.stop.prevent="follow({ user: getUserByIdVuex, action: 1})"
        >
          跟隨
        </button>
      </div>
      <div class="mt-24 ml-15 mr-15">
        <div class="user-name">{{ getUserByIdVuex.name }}</div>
        <div class="user-account">
          {{ getUserByIdVuex.account | userAccount }}
        </div>
        <div class="description mt-10">
          {{ getUserByIdVuex.introduction }}
        </div>
        <div class="follow-container mt-10 mb-20">
          <router-link :to="{ name: 'UserFollowing' }" class="mr-20">
            <span class="text-dark"
              >{{ getUserByIdVuex.totalFollowings }} 個</span
            >
            <span>跟隨中</span>
          </router-link>
          <router-link :to="{ name: 'UserFollowers' }">
            <span class="text-dark"
              >{{ getUserByIdVuex.totalFollowers }} 位</span
            >
            <span>跟隨者</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import { accountStringFilter, fetchAllTweetsMixins, followingMixins } from '@/utils/mixins'

export default {
  name: 'userProfile',
  mixins: [accountStringFilter, fetchAllTweetsMixins, followingMixins],
  props: ['isCurrentUser'],
  created () {
    this.fetchPopularUsers()
    this.fetchAllFollowing()
  },
  methods: {
    editProfile () {
      // 打開編輯modal
      this.$store.commit('toggleEditProfileModal')
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getUserByIdVuex', 'getFollowing']),
    isFollowing () {
      // 取currentUser正在跟蹤的所有使用者清單，比對清單中的userId是否跟現在瀏覽的個人頁面id一致
      const result = this.getFollowing.filter(user => user.followingId === this.getUserByIdVuex.id)
      return result.length ? result[0].isFollowings : false
    }
  }
}
</script>

<style></style>
