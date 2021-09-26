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
        <router-link :to="{ name: 'Notification' }">
          <img src="@/assets/images/nav-notification.svg" alt="notification" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Chat' }">
          <img src="@/assets/images/nav-chat.svg" alt="chat" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DirectMessage' }">
          <img src="@/assets/images/nav-chat.svg" alt="direct message" />
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'UserAllTweets', params: { userAccount: getUser.id } }"
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
    <button class="btn btn-left-nav-logout" @click="logout">
      <img src="@/assets/images/nav-logout.svg" alt="logout" />
    </button>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { navMethods } from '@/utils/mixins'

export default {
  name: 'navLeft',
  mixins: [navMethods],
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style>
</style>
