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
    <button class="btn btn-left-nav-logout" @click="logout">
      <img src="@/assets/images/nav-logout.svg" alt="logout" />
      <span>登出</span>
    </button>
  </nav>
</template>

<script>
import { navMethods } from '@/utils/mixins'

export default {
  name: 'navLeftDesktopAdmin',
  mixins: [navMethods]
}
</script>

<style>

</style>
