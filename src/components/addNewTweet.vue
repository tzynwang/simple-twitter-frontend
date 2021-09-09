<template>
  <section class="add-new-tweet">
    <textarea v-model.trim="newTweet" placeholder="有什麼新鮮事？"></textarea>
    <img class="avatar-img" src="" alt="avatar" />
    <span v-show="isLengthError" class="error-message">{{ errorMessage }}</span>
    <button
      class="btn btn-primary btn-new-tweet"
      @click="addNewTweet"
      @blur="cancel"
    >
      推文
    </button>
  </section>
</template>

<script>
export default {
  name: 'addNewTweet',
  data () {
    return {
      newTweet: '',
      isLengthError: false
    }
  },
  methods: {
    addNewTweet () {
      if (this.newTweet.length > 140 || this.newTweet.length === 0) {
        this.isLengthError = true
      }
      // if (this.newTweet.length > 0 && this.newTweet.length <= 140) 可以送出
    },
    cancel () {
      this.isLengthError = false
    }
  },
  computed: {
    errorMessage () {
      if (this.newTweet.length === 0) return '字數不可為 0'
      if (this.newTweet.length > 140) return '字數不可超過 140 字'
      return ''
    }
  }
}
</script>

<style>
</style>
