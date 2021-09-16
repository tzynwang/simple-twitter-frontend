<template>
  <nav class="nav-left">
    <ul>
      <li>
        <img src="@/assets/images/logo.svg" alt="logo" @click="toHome" />
      </li>
      <li>
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/images/nav-home.svg" alt="home" />
          <span>首頁</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'UserAllTweets', params: { userAccount: 'userId' } }">
          <img src="@/assets/images/nav-user.svg" alt="user" />
          <span>個人資料</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Settings' }">
          <img src="@/assets/images/nav-setting.svg" alt="settings" />
          <span>設定</span>
        </router-link>
      </li>
      <li>
        <button class="btn btn-primary btn-left-nav-new-tweet" @click="openAddNewTweetModal">推文</button>
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
  name: 'navLeftDesktop',
  mixins: [navMethods]
}

</script>

<style>
</style>
