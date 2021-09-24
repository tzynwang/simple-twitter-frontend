<template>
  <nav class="nav-bottom">
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/images/nav-home.svg" alt="home icon">
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Chat' }">
          <img src="@/assets/images/nav-chat.svg" alt="chat room icon">
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DirectMessage' }">
          <img src="@/assets/images/nav-chat.svg" alt="direct message" />
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'UserAllTweets', params: { userAccount: getUser.id } }">
          <img src="@/assets/images/nav-user.svg" alt="user page icon">
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Settings' }">
          <img src="@/assets/images/nav-setting.svg" alt="settings icon">
        </router-link>
      </li>
      <li>
        <button class="btn" @click="logout">
          <img src="@/assets/images/nav-logout.svg" alt="logout icon">
        </button>
      </li>
    </ul>
    <button v-if="!inChat" class="btn btn-primary btn-round" @click="openAddNewTweetModal">
      <img src="@/assets/images/nav-tweet.svg" alt="new tweet icon">
    </button>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { navMethods } from '@/utils/mixins'

export default {
  name: 'navBottom',
  mixins: [navMethods],
  props: ['inChat'],
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style>

</style>
