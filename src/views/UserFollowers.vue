<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUserByIdVuex.name"
      :tweet-counts="getUserByIdVuex.totalTweets"
    />
    <section class="container-body">
      <userTab />
      <user v-for="user in getFollowers" :key="user.followerId" :initial-user="user" />
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from '@/components/navTopArrowTweetsCount'
import userTab from '@/components/userTab'
import user from '@/components/user'

import { mapState, mapGetters } from 'vuex'
import { fetchUserByIdInPathMixins } from '@/utils/mixins'

export default {
  name: 'UserFollowers',
  mixins: [fetchUserByIdInPathMixins],
  components: {
    navTopArrowTweetsCount,
    userTab,
    user
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUserByIdVuex', 'getFollowers'])
  },
  created () {
    this.getUserById(this.$route.params.userAccount)
    this.getAllFollowersByUserId(this.$route.params.userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    this.getUserById(to.params.userAccount)
    this.getAllFollowersByUserId(to.params.userAccount)
    next()
  }
}
</script>
