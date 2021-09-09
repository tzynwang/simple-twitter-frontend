<template>
  <nav class="nav-left">
    <ul>
      <li>
        <img src="@/assets/images/logo.svg" alt="logo" @click="toAdminAllTweets" />
      </li>
      <li>
        <router-link :to="{ name: 'AdminAllTweets' }">
          <img src="@/assets/images/nav-home.svg" alt="home" />
          <span>推文清單</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AdminAllUsers' }">
          <img src="@/assets/images/nav-user.svg" alt="user" />
          <span>使用者列表</span>
        </router-link>
      </li>
    </ul>
    <button class="btn btn-left-nav-logout">
      <img src="@/assets/images/nav-logout.svg" alt="logout" />
      <span>登出</span>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'navLeftDesktopAdmin',
  methods: {
    toAdminAllTweets () {
      if (this.$route.fullPath === '/admin/tweets') return
      this.$router.push({ name: 'AdminAllTweets' })
      /*
      這邊不使用router-link實作是因為.router-link-active會給img加上橙色filter
      故設計成點擊img後推回/home
      */
    }
  }
}
</script>

<style>

</style>
