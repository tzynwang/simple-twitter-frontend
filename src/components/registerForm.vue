<template>
  <form @submit.prevent="formSubmit">
    <div>
      <input type="text" id="account" name="account">
      <label for="account">帳號</label>
      <div class="error-message"></div>
    </div>
    <div>
      <input type="text" id="name" name="name">
      <label for="name">名稱</label>
      <div class="error-message"></div>
    </div>
    <div>
      <input type="email" id="email" name="email">
      <label for="email">Email</label>
      <div class="error-message"></div>
    </div>
    <div>
      <input type="password" id="password" name="password">
      <label for="password">密碼</label>
      <div class="error-message"></div>
    </div>
    <div>
      <input type="password" id="passwordConfirm" name="passwordConfirm">
      <label for="passwordConfirm">密碼確認</label>
      <div class="error-message"></div>
    </div>
    <button :disabled="isProcessing">{{ registerButtonText }}</button>
    <router-link :to="{ name: 'Login' }">取消</router-link>
  </form>
</template>

<script>
export default {
  name: 'registerForm',
  data () {
    return {
      isProcessing: false
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
