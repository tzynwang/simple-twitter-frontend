<template>
  <form class="mt-20" @submit.prevent="formSubmit">
    <div
      :class="['input-group', 'input-account', { 'input-error': accountError }]"
    >
      <input type="text" id="account" name="account" />
      <label for="account">帳號</label>
      <div class="error-message" v-show="accountError">帳號已重覆註冊</div>
    </div>
    <div :class="['input-group', { 'input-error': nameError }]">
      <input type="text" id="name" name="name" />
      <label for="name">名稱</label>
      <div class="error-message" v-show="nameError"></div>
    </div>
    <div :class="['input-group', { 'input-error': emailError }]">
      <input type="email" id="email" name="email" />
      <label for="email">Email</label>
      <div class="error-message" v-show="emailError">Email已重覆註冊</div>
    </div>
    <div :class="['input-group', { 'input-error': passwordError }]">
      <input type="password" id="password" name="password" />
      <label for="password">密碼</label>
      <div class="error-message" v-show="passwordError">
        密碼與密碼確認內容不一致
      </div>
    </div>
    <div class="input-group">
      <input type="password" id="passwordConfirm" name="passwordConfirm" />
      <label for="passwordConfirm">密碼確認</label>
      <div class="error-message"></div>
    </div>
    <button class="btn btn-primary btn-form-submit" :disabled="isProcessing">
      {{ registerButtonText }}
    </button>
    <router-link class="pre-login-link text-center mt-20" :to="{ name: 'Login' }">取消</router-link>
  </form>
</template>

<script>
export default {
  name: 'registerForm',
  data () {
    return {
      isProcessing: false,
      accountError: false,
      nameError: false,
      emailError: false,
      passwordError: false
    }
  },
  methods: {
    formSubmit () {
      // if (this.isProcessing) return
    }
  },
  computed: {
    registerButtonText () {
      return this.isProcessing ? '請稍候' : '註冊'
    }
  }
}
</script>

<style>
</style>
