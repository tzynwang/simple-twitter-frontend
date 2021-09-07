<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTop />
      <p>body Settings page</p>
      <navBottom />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <p>left nav</p>
      <p>body Settings page</p>
    </template>
    <template v-else>
      <p>left nav</p>
      <p>body Settings page</p>
      <p>right section</p>
    </template>
  </main>
</template>

<script>
import navTop from './../components/navTop'
import navBottom from './../components/navBottom'

import { mapState } from 'vuex'

export default {
  name: 'Setting',
  components: {
    navTop,
    navBottom
  },
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>
