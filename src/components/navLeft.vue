<template>
  <nav class="nav-left">
    <ul>
      <li>
        <img src="@/assets/images/logo.svg" alt="logo" @click="toHome" />
      </li>
      <li>
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/images/nav-home.svg" alt="home" />
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'UserAllTweets', params: { userAccount: 'userId' } }"
        >
          <img src="@/assets/images/nav-user.svg" alt="user" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Settings' }">
          <img src="@/assets/images/nav-setting.svg" alt="settings" />
        </router-link>
      </li>
      <li>
        <button class="btn btn-primary btn-round" @click="openAddNewTweetModal">
          <img src="@/assets/images/nav-tweet.svg" alt="new tweet icon" />
        </button>
      </li>
    </ul>
    <button class="btn btn-left-nav-logout">
      <img src="@/assets/images/nav-logout.svg" alt="logout" />
    </button>
  </nav>
</template>

<script>
export default {
  name: 'navLeft',
  methods: {
    toHome () {
      if (this.$route.fullPath === '/home') return
      this.$router.push({ name: 'Home' })
      /*
      這邊不使用router-link實作是因為.router-link-active會給img加上橙色filter
      故設計成點擊img後推回/home
      */
    },
    openAddNewTweetModal () {
      // 打開推文modal
      this.$store.commit('toggleAddNewTweetModal')
    }
  }
}
</script>

<style>
</style>
