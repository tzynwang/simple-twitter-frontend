<template>
  <form class="mt-20" @submit.prevent="formSubmit">
    <div
      :class="['input-group', 'input-account', { 'input-error': accountError }]"
    >
      <input v-model.trim="account" type="text" id="account" name="account" />
      <label for="account">帳號</label>
      <div class="error-message" v-show="accountError">
        {{ accountErrorMessage }}
      </div>
    </div>
    <div
      :class="[
        'input-group',
        'input-group-last',
        { 'input-error': passwordError }
      ]"
    >
      <input
        v-model.trim="password"
        type="password"
        id="password"
        name="password"
      />
      <label for="password">密碼</label>
      <div class="error-message" v-show="passwordError">
        {{ passwordErrorMessage }}
      </div>
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
import isLength from 'validator/lib/isLength'
import { failToast } from './../utils/toasts'

export default {
  name: 'loginForm',
  data () {
    return {
      fullPath: '', // 可能是/admin/login或/login
      account: '',
      password: '',
      isProcessing: false,
      accountError: false,
      accountErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: ''
    }
  },
  created () {
    const { fullPath } = this.$route
    this.fullPath = fullPath
  },
  beforeRouteUpdate (to, from, next) {
    const { fullPath } = to.$route
    this.fullPath = fullPath
    next()
  },
  methods: {
    formSubmit () {
      // 先檢查所有欄位是否都填了
      if (!isLength(this.account, { min: 4, max: 50 })) {
        this.accountError = true
        this.accountErrorMessage = '請輸入帳號'
        return
      } else {
        this.accountError = false
      }

      if (!isLength(this.password, { min: 4, max: 50 })) {
        this.passwordError = true
        this.passwordErrorMessage = '請輸入密碼'
        return
      } else {
        this.passwordError = false
      }

      // 都有好好填寫再送出
      try {
        // 從後台取回user.role後，根據this.fullPath判定該登入是否有效
        // if (user.role === 'user' && this.fullPath === '/admin/login' || user.role === 'admin' && this.fullPath === '/login') return 阿伯 出 4了

        // 登入有效再把token存到localStorage跟vuex中

        // 跳轉到/home或/admin/tweets
        // if (user.role === 'user') this.$router.push({ name: 'Home' })
        // if (user.role === 'admin') this.$router.push({ name: 'Admin' })
        this.$router.push({ name: 'Home' })
      } catch (error) {
        failToast.fire({
          title: '暫時無法登入，請稍候再試'
        })
      }
    }
  },
  computed: {
    loginButtonText () {
      return this.isProcessing ? '請稍候' : '登入'
    }
  }
}
</script>

<style></style>
