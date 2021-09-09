<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <router-view />
      <navBottom />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <router-view />
    </template>
    <template v-else>
      <navLeftDesktop />
      <router-view />
      <popularList />
    </template>
  </main>
</template>

<script>
import navBottom from './../components/navBottom'

// tablet
import navLeft from './../components/navLeft'

// desktop
import navLeftDesktop from './../components/navLeftDesktop'
import popularList from './../components/popularList'

import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    navBottom,
    navLeft,
    navLeftDesktop,
    popularList
  },
  created () {
    // get userId by route
    const { fullPath } = this.$route
    this.fullPath = fullPath
  },
  beforeRouteUpdate (to, from, next) {
    // get userId by route
    this.fullPath = to.fullPath
    next()
  },
  data () {
    return {
      fullPath: ''
    }
  },
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>
