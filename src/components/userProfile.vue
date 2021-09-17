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
          @click="editProfile"
        >
          編輯個人資料
        </button>
        <button
          v-else-if="isFollowing"
          class="btn btn-primary btn-profile-action mt-10 mr-15"
          @click="follow({ userId: getUserByIdVuex.id, action: -1})"
        >
          正在跟隨
        </button>
        <button
          v-else
          class="btn btn-primary-outline btn-profile-action mt-10 mr-15"
          @click="follow({ userId: getUserByIdVuex.id, action: 1})"
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
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'userProfile',
  mixins: [accountStringFilter],
  props: ['isCurrentUser', 'isFollowing'],
  methods: {
    editProfile () {
      // 打開編輯modal
      this.$store.commit('toggleEditProfileModal')
    },
    follow ({ userId, action }) {
      // 測試用
      console.log('userId', userId)
      console.log('action', action)
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getUserByIdVuex'])
  }
}
</script>

<style></style>
