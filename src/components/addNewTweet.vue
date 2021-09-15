<template>
  <section class="add-new-tweet">
    <textarea v-model.trim="newTweet" placeholder="有什麼新鮮事？"></textarea>
    <img class="avatar-img" src="" alt="avatar" />
    <span v-show="displayErrorMessage" class="error-message">{{ errorMessage }}</span>
    <button
      class="btn btn-primary btn-new-tweet"
      @click="addNewTweet"
      @blur="cancel"
      :disabled="isLengthError"
    >
      推文
    </button>
  </section>
</template>

<script>
import isLength from 'validator/lib/isLength'
import { failToast } from './../utils/toasts'

export default {
  name: 'addNewTweet',
  data () {
    return {
      newTweet: '',
      isLengthError: true,
      errorMessage: '',
      displayErrorMessage: false
    }
  },
  methods: {
    addNewTweet () {
      if (!isLength(this.newTweet, { min: 1, max: 140 })) {
        this.errorMessage = '推文長度限制在1至140字之間'
        this.isLengthError = true
        this.displayErrorMessage = true
        return
      }

      try {
        this.isLengthError = false
        // 送後端 POST https://localhost:3000/api/tweets
        // 後端確認新增成功後，將推文內容新增到前端的推文陣列中

        // 測試用
        console.log(this.newTweet.length, this.newTweet)

        // 推文發出後，清空textarea，disabled推文按鈕
        this.newTweet = ''
        this.isLengthError = true
        this.displayErrorMessage = false
      } catch (error) {
        failToast.fire({
          title: '新增推文失敗'
        })
        this.isLengthError = true
        this.displayErrorMessage = false
      }
    },
    cancel () {
      // blur時僅disabled推文按鈕，隱藏錯誤訊息
      this.displayErrorMessage = false
    }
  },
  watch: {
    newTweet: function (value) {
      if (value.length === 0) {
        this.errorMessage = '內容不可空白'
        this.isLengthError = true
        this.displayErrorMessage = true
      } else if (value.length > 140) {
        this.errorMessage = '字數不可超過 140 字'
        this.isLengthError = true
        this.displayErrorMessage = true
      } else {
        this.isLengthError = false
        this.displayErrorMessage = false
      }
    }
  }
}
</script>

<style></style>
