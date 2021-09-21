<template>
  <div class="form-header mt-60">
    <img src='@/assets/images/logo.svg' alt="logo">
    <transition name="fade" appear>
      <div class="form-title mt-30">{{ fullPath | title }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'formHeader',
  created () {
    const { fullPath } = this.$route
    this.fullPath = fullPath
  },
  data () {
    return {
      fullPath: ''
    }
  },
  filters: {
    title (fullPath) {
      switch (fullPath) {
        case '/login':
          return '登入 Alphitter'
        case '/register':
          return '建立你的帳號'
        case '/admin/login':
          return '後台登入'
      }
    }
  }
}
</script>

<style>

</style>
