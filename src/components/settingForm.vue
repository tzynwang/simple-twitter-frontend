<template>
  <form class="mt-30 container-setting-form" @submit.prevent="formSubmit">
    <div
      :class="['input-group', 'input-account', { 'input-error': accountError }]"
    >
      <input type="text" id="account" name="account" />
      <label for="account">帳號</label>
      <div class="error-message" v-show="accountError">此帳號已經被使用</div>
    </div>
    <div :class="['input-group', { 'input-error': nameError }]">
      <input type="text" id="name" name="name" />
      <label for="name">名稱</label>
      <div class="error-message" v-show="nameError"></div>
    </div>
    <div :class="['input-group', { 'input-error': emailError }]">
      <input type="email" id="email" name="email" />
      <label for="email">Email</label>
      <div class="error-message" v-show="emailError">此Email已經被使用</div>
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
    <div class="text-right">
      <button class="btn btn-primary btn-form-save" :disabled="isProcessing">
        {{ registerButtonText }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'settingForm',
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
      return this.isProcessing ? '請稍候' : '儲存'
    }
  }
}
</script>

<style>
</style>
