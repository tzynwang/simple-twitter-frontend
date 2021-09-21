<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUserByIdVuex.name"
      :tweet-counts="getUserByIdVuex.totalTweets"
    />
    <section class="container-body">
      <userTab />
      <user v-for="user in getFollowing" :key="user.followingId" :initial-user="user" />
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
  name: 'UserFollowing',
  mixins: [fetchUserByIdInPathMixins],
  components: {
    navTopArrowTweetsCount,
    userTab,
    user
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUserByIdVuex', 'getFollowing'])
  },
  created () {
    this.getUserById(this.$route.params.userAccount)
    this.getAllFollowingByUserId(this.$route.params.userAccount)
  },
  beforeRouteUpdate (to, from, next) {
    this.getUserById(to.params.userAccount)
    this.getAllFollowingByUserId(to.params.userAccount)
    next()
  }
}
</script>
