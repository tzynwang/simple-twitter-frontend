<template>
  <form class="mt-20" @submit.prevent="formSubmit">
    <div
      :class="['input-group', 'input-account', { 'input-error': accountError }]"
    >
      <input type="text" id="account" name="account" />
      <label for="account">帳號</label>
      <div class="error-message" v-show="accountError">帳號不存在</div>
    </div>
    <div
      :class="[
        'input-group',
        'input-group-last',
        { 'input-error': passwordError },
      ]"
    >
      <input type="password" id="password" name="password" />
      <label for="password">密碼</label>
      <div class="error-message" v-show="passwordError">密碼與帳號不符</div>
    </div>
    <button
      class="btn btn-primary btn-form-submit mt-40"
      :disabled="isProcessing"
    >
      {{ loginButtonText }}
    </button>
    <!-- buttons for /login -->
    <div v-if="fullPath === '/login'" class="text-right mt-20">
      <router-link
        class="pre-login-link link-separator"
        :to="{ name: 'Register' }"
        >註冊 Alphitter</router-link
      >
      <router-link class="pre-login-link" :to="{ name: 'AdminLogin' }"
        >後台登入</router-link
      >
    </div>
    <!-- buttons for /admin/login -->
    <div v-if="fullPath === '/admin/login'" class="text-right mt-20">
      <router-link class="pre-login-link" :to="{ name: 'Login' }"
        >前台登入</router-link
      >
    </div>
  </form>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      fullPath: '',
      isProcessing: false,
      accountError: false,
      passwordError: false
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
