<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <p>body home page</p>
      </section>
      <navBottom />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <p>left nav</p>
      <p>body Home page</p>
    </template>
    <template v-else>
      <p>left nav</p>
      <p>body Home page</p>
      <p>right section</p>
    </template>
  </main>
</template>

<script>
import navTop from './../components/navTop'
import navBottom from './../components/navBottom'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    navTop,
    navBottom
  },
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>
