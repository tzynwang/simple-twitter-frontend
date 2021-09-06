<template>
  <div>
    /home; post-login page, see all tweets
    <button class="btn btn-follow btn-primary" @click="fireToast">推文</button>
    <button class="btn btn-follow btn-primary-outline" @click="fireToastFail">編輯個人資料</button>
  </div>
</template>

<script>
import { successToast, failToast } from './../utils/toasts'

export default {
  name: 'Home',
  methods: {
    fireToast () {
      successToast.fire({
        title: '推文發送成功'
      })
    },
    fireToastFail () {
      failToast.fire({
        title: 'Email已重複註冊'
      })
    }
  }
}
</script>
