<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <p>body admin all user page</p>
      </section>
      <navBottomAdmin />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <p>left nav</p>
      <p>body admin all user page</p>
    </template>
    <template v-else>
      <p>left nav</p>
      <p>body admin all user page</p>
      <p>right section</p>
    </template>
  </main>
</template>

<script>
import navTop from './../components/navTop'
import navBottomAdmin from './../components/navBottomAdmin'

import { mapState } from 'vuex'

export default {
  name: 'AdminAllUsers',
  components: {
    navTop,
    navBottomAdmin
  },
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>

<style>

</style>
