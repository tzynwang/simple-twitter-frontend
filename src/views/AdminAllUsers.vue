<template>
  <main class="container">
    <!-- mobile -->
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body container-flex">
        <userCard v-for="user in users" :key="user.id" :user="user" />
      </section>
      <navBottomAdmin />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeftAdmin v-if="windowWidth >= 768 && windowWidth < 1200"/>
      <navLeftDesktopAdmin v-else />
      <section class="container-body-column-merge">
        <navTop />
        <section class="container-body container-flex">
          <userCard v-for="user in users" :key="user.id" :user="user" />
        </section>
      </section>
    </template>
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import navBottomAdmin from '@/components/navBottomAdmin'
import userCard from '@/components/userCard'
import navLeftAdmin from '@/components/navLeftAdmin'
import navLeftDesktopAdmin from '@/components/navLeftDesktopAdmin'
import userAPI from '@/apis/user'

import { mapState } from 'vuex'
import { failToast } from '@/utils/toasts'

export default {
  name: 'AdminAllUsers',
  components: {
    navTop,
    userCard,
    navBottomAdmin,
    navLeftAdmin,
    navLeftDesktopAdmin
  },
  data () {
    return {
      users: []
    }
  },
  computed: {
    ...mapState(['windowWidth'])
  },
  created () {
    this.fetchAdminAllUsers()
  },
  methods: {
    async fetchAdminAllUsers () {
      try {
        const { data } = await userAPI.getAdminAllUsers()
        this.users = data
      } catch (error) {
        failToast.fire({
          title: '無法取得使用者列表，請稍候再試'
        })
      }
    }
  }
}
</script>

<style>

</style>
