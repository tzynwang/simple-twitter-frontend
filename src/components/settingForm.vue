<template>
  <form class="mt-30 container-setting-form" @submit.prevent="formSubmit">
    <div
      :class="['input-group', 'input-account', { 'input-error': accountError }]"
    >
      <input v-model.trim="account" type="text" id="account" name="account" />
      <label for="account">帳號</label>
      <div class="error-message" v-show="accountError">
        {{ accountErrorMessage }}
      </div>
    </div>
    <div :class="['input-group', { 'input-error': nameError }]">
      <input v-model.trim="name" type="text" id="name" name="name" />
      <label for="name">名稱</label>
      <div class="error-message" v-show="nameError">{{ nameErrorMessage }}</div>
    </div>
    <div :class="['input-group', { 'input-error': emailError }]">
      <input v-model.trim="email" type="email" id="email" name="email" />
      <label for="email">Email</label>
      <div class="error-message" v-show="emailError">
        {{ emailErrorMessage }}
      </div>
    </div>
    <div :class="['input-group', { 'input-error': passwordError }]">
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
    <div class="input-group input-group-last">
      <input
        v-model.trim="checkPassword"
        type="password"
        id="checkPassword"
        name="checkPassword"
      />
      <label for="checkPassword">密碼確認</label>
    </div>
    <div class="text-right mt-40">
      <button class="btn btn-primary btn-form-save" :disabled="isProcessing">
        {{ registerButtonText }}
      </button>
    </div>
  </form>
</template>

<script>
import isLength from 'validator/lib/isLength'
import isBase64 from 'validator/lib/isBase64'
import isEmail from 'validator/lib/isEmail'

import { mapGetters } from 'vuex'

import { failToast, successToast } from '@/utils/toasts'
import userAPI from '@/apis/user'

export default {
  name: 'settingForm',
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false,
      accountError: false,
      accountErrorMessage: '',
      nameError: false,
      nameErrorMessage: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: ''
    }
  },
  mounted () {
    this.account = this.getUser.account
    this.name = this.getUser.name
    this.email = this.getUser.email
  },
  methods: {
    async formSubmit () {
      if (this.isProcessing) return

      // 以下單字會和路由衝突，不允許註冊
      const prohibitedAccounts = [
        'login',
        'register',
        'home',
        'settings',
        'admin'
      ]

      // account驗證
      if (!isLength(this.account, { min: 4, max: 50 })) {
        this.accountError = true
        this.accountErrorMessage = '帳號字數需在4至50字之間'
      } else if (!isBase64(this.account, { urlSafe: true })) {
        this.accountError = true
        this.accountErrorMessage =
          '帳號僅能使用大小寫英文字母、數字、連字符號（-）或底線符號（_）'
      } else if (prohibitedAccounts.includes(this.account.toLowerCase())) {
        this.accountError = true
        this.accountErrorMessage = '無法使用特定單字作為帳號'
      } else {
        this.accountError = false
      }

      // name驗證
      if (!isLength(this.name, { min: 4, max: 50 })) {
        this.nameError = true
        this.nameErrorMessage = '名稱字數需在4至50字之間'
      } else {
        this.nameError = false
      }

      // email驗證
      if (!isEmail(this.email)) {
        this.emailError = true
        this.emailErrorMessage = '請輸入有效Email'
      } else {
        this.emailError = false
      }

      // password驗證
      if (!isLength(this.password, { min: 4, max: 50 })) {
        this.passwordError = true
        this.passwordErrorMessage = '密碼字數需在4至50字之間'
      } else if (this.password !== this.checkPassword) {
        this.passwordError = true
        this.passwordErrorMessage = '密碼與確認密碼內容須一致'
      } else {
        this.passwordError = false
      }

      // 以上全部通過才送給後端
      if (
        this.accountError ||
        this.emailError ||
        this.nameError ||
        this.passwordError
      ) {
        return
      }

      // 後端驗證
      this.isProcessing = true
      try {
        const { data } = await userAPI.editUserProfile(this.getUser.id, {
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })

        if (data.status !== '200') throw new Error(data.message)

        this.accountError = false
        this.emailError = false

        successToast.fire({
          title: '資料修改成功'
        })

        // 清空密碼欄位
        this.password = ''
        this.checkPassword = ''

        this.isProcessing = false
      } catch (error) {
        const { data } = error.response

        if (data.status === '409') {
          switch (data.message) {
            case '帳號已被使用':
              this.accountError = true
              this.accountErrorMessage = '帳號已被使用'
              break
            case 'Email已被使用':
              this.emailError = true
              this.emailErrorMessage = 'Email已被使用'
          }
        }

        if (data.status === '500') {
          failToast.fire({
            title: '無法修改資料，請稍候再試'
          })
        }

        this.password = ''
        this.checkPassword = ''
        this.isProcessing = false
      }
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    registerButtonText () {
      return this.isProcessing ? '請稍候' : '儲存'
    }
  }
}
</script>

<style>
</style>
