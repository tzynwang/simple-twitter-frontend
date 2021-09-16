<template>
  <nav class="nav-bottom nav-bottom-admin">
    <ul>
      <li>
        <router-link :to="{ name: 'AdminAllTweets' }">
          <img src="@/assets/images/nav-home.svg" alt="home icon">
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AdminAllUsers' }">
          <img src="@/assets/images/nav-user.svg" alt="all users icon">
        </router-link>
      </li>
      <li>
        <button class="btn" @click="logout">
          <img src="@/assets/images/nav-logout.svg" alt="logout icon">
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { navMethods } from '@/utils/mixins'

export default {
  name: 'navBottomAdmin',
  mixins: [navMethods]
}
</script>

<style>

</style>
