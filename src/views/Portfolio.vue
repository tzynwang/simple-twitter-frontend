<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <p>header</p>
      <router-view />
      <p>bottom nav</p>
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <p>left nav</p>
      <router-view />
    </template>
    <template v-else>
      <p>left nav</p>
      <router-view />
      <p>right section</p>
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Portfolio',
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>
