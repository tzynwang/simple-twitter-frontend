<template>
  <div class="nav-top">{{ fullPath | title }}</div>
</template>

<script>
export default {
  name: 'navTop',
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
        case '/home':
          return '首頁'
        case '/settings':
          return '帳戶設定'
        case '/admin/tweets':
          return '推文清單'
        case '/admin/users':
          return '使用者列表'
      }
    }
  }
}
</script>

<style>
</style>
