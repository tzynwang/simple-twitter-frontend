<template>
  <ul class="popular-list">
    <li class="popular-list-title">Popular</li>
    <!-- TODO: 串API之後就可以用v-for跑畫面囉 -->
    <li class="popular-list-user">
      <img src="" alt="user avatar" />
      <div class="popular-list-user-info">
        <div class="user-name">userName</div>
        <div class="user-account">@userAccount</div>
      </div>
      <button
        v-if="isFollowing"
        @click="follow()"
        class="btn btn-primary btn-follow popular-list-user-follow"
      >
        正在跟隨
      </button>
      <button
        v-if="!isFollowing"
        @click="follow()"
        class="btn btn-primary-outline btn-follow popular-list-user-follow"
      >
        跟隨
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'popularList',
  data () {
    return {
      isFollowing: true
      // TODO: 之後要根據登入使用者的跟隨狀態給每一個popular user判定追蹤狀態
    }
  },
  methods: {
    follow () {
      // TODO: 實作時需傳入使用者id，對後端發出修改跟隨狀態的請求，再修改vuex跟隨狀態資料
    }
  }
}
</script>

<style>
</style>
