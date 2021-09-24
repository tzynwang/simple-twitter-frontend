<template>
  <section class="container-body-tablet-desktop">
    <navTopArrowTweetsCount
      :user-name="getUserByIdVuex.name"
      :tweet-counts="getUserByIdVuex.totalTweets"
    />
    <section class="container-body">
      <userTab />
      <spinner v-if="!fetchAllFollowingDone" />
      <user v-else-if="getFollowingByUserIdVuex.length" v-for="user in getFollowingByUserIdVuex" :key="user.followingId" :initial-user="user" />
      <div v-else class="text-center mt-20">
        該使用者目前沒有跟隨中內容
      </div>
    </section>
  </section>
</template>

<script>
import navTopArrowTweetsCount from '@/components/navTopArrowTweetsCount'
import userTab from '@/components/userTab'
import user from '@/components/user'
import spinner from '@/components/spinner'

import { mapState, mapGetters } from 'vuex'
import { fetchUserByIdInPathMixins } from '@/utils/mixins'

export default {
  name: 'UserFollowing',
  mixins: [fetchUserByIdInPathMixins],
  components: {
    navTopArrowTweetsCount,
    userTab,
    user,
    spinner
  },
  data () {
    return {
      fetchAllFollowingDone: false
    }
  },
  computed: {
    ...mapState(['windowWidth']),
    ...mapGetters(['getUserByIdVuex', 'getFollowingByUserIdVuex'])
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
