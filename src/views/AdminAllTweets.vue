<template>
  <main class="container">
    <!-- mobile -->
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <tweetToDelete />
      </section>
      <navBottomAdmin />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeftAdmin v-if="windowWidth >= 768 && windowWidth < 1200"/>
      <navLeftDesktopAdmin v-else />
      <section class="container-body-column-merge">
        <navTop />
        <section class="container-body">
          <tweetToDelete />
        </section>
      </section>
    </template>
  </main>
</template>

<script>
import navTop from './../components/navTop'
import tweetToDelete from './../components/tweetToDelete'
import navBottomAdmin from './../components/navBottomAdmin'

// tablet
import navLeftAdmin from './../components/navLeftAdmin'

// desktop
import navLeftDesktopAdmin from './../components/navLeftDesktopAdmin'

import { mapState } from 'vuex'

export default {
  name: 'AdminAllTweets',
  components: {
    navTop,
    tweetToDelete,
    navBottomAdmin,
    navLeftAdmin,
    navLeftDesktopAdmin
  },
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>

<style>

</style>
