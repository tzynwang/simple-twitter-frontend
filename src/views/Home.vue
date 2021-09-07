<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <p>header</p>
      <p>body Home page</p>
      <p>bottom nav</p>
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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>
