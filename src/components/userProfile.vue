<template>
  <section class="user-profile">
    <!-- image area -->
    <div class="modal-body user-profile-image">
      <img class="profile-background-img" src="" alt="user profile background image">
      <div class="avatar-container">
        <img class="profile-avatar-img" src="" alt="avatar">
      </div>
    </div>
    <!-- text area -->
    <div>
      <div class="buttons-container text-right">
        <button
          v-if="isCurrentUser"
          class="btn btn-primary-outline btn-profile-action mt-10 mr-15"
          @click="editProfile">
          編輯個人資料
        </button>
        <button
          v-else-if="isFollowing"
          class="btn btn-primary btn-profile-action mt-10 mr-15"
          @click="editProfile">
          正在跟隨
        </button>
        <button v-else
          class="btn btn-primary-outline btn-profile-action mt-10 mr-15"
          @click="editProfile">
          跟隨
        </button>
      </div>
      <div class="mt-24 ml-15 mr-15">
        <div class="user-name">userName</div>
        <div class="user-account">{{ "aUserAccount" | userAccount }}</div>
        <div class="description mt-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam quidem magni sapiente, deleniti hic numquam et
          corrupti perferendis similique placeat facilis esse fugit officiis ducimus perspiciatis vero voluptatem fuga
          asperiores.
        </div>
        <div class="follow-container mt-10 mb-20">
          <router-link :to="{ name: 'UserFollowing' }" class="mr-20">
            <span class="text-dark">{{following}} 個</span>
            <span>跟隨中</span>
          </router-link>
          <router-link :to="{ name: 'UserFollowers' }">
            <span class="text-dark">{{follower}} 位</span>
            <span>跟隨者</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'userProfile',
  mixins: [accountStringFilter],
  data () {
    return {
      following: 34,
      follower: 59,
      isCurrentUser: true,
      isFollowing: true
    }
  },
  methods: {
    editProfile () {
      // 打開編輯modal
      this.$store.commit('toggleEditProfileModal')
    }
  }
}

</script>

<style>

</style>
