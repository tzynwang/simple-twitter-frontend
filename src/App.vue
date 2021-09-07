<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)
  },
  destroyed () {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  methods: {
    getWindowWidth () {
      this.$store.commit('setWindowWidth', window.innerWidth)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss'
</style>
