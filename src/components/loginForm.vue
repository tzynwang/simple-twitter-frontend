<template>
  <form @submit.prevent="formSubmit">
    <div>
      <input type="text" id="account" name="account">
      <label for="account">帳號</label>
      <div class="error-message"></div>
    </div>
    <div>
      <input type="password" id="password" name="password">
      <label for="password">密碼</label>
      <div class="error-message"></div>
    </div>
    <button :disabled="isProcessing">{{ loginButtonText }}</button>
    <template v-if="fullPath === '/login'">
      <router-link :to="{ name: 'Register' }">註冊 Alphitter</router-link>
      <router-link :to="{ name: 'AdminLogin' }">後台登入</router-link>
    </template>
    <template v-if="fullPath === '/admin/login'">
      <router-link :to="{ name: 'Login' }">前台登入</router-link>
    </template>
  </form>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      fullPath: '',
      isProcessing: false
    }
  },
  created () {
    const { fullPath } = this.$route
    this.fullPath = fullPath
  },
  methods: {
    formSubmit () {
      // 先檢查所有欄位是否都填了
      // 都有好好填寫再送出
      // 登入順利的話會拿到token
      // 把token存到localStorage跟vuex中
      // 跳轉到/home或/admin/tweets
    }
  },
  computed: {
    loginButtonText () {
      return this.isProcessing ? '請稍候' : '登入'
    }
  }
}
</script>

<style>

</style>
