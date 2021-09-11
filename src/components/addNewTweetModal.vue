<template>
  <transition name="fade">
    <div class="modal-background">
      <div class="modal">
        <!-- header -->
        <div class="modal-header">
          <img class="ml-15" src="@/assets/images/modal-close.svg" alt="close modal" @click="closeModal">
        </div>
        <!-- reply section -->
        <div class="modal-input-section">
          <section class="add-new-tweet">
            <textarea v-model.trim="newTweet" placeholder="有什麼新鮮事？" ref="replySection"></textarea>
            <img class="avatar-img" src="" alt="avatar" />
            <span v-show="isLengthError" class="error-message">{{ errorMessage }}</span>
            <button class="btn btn-primary btn-new-tweet" @click="addNewTweet" @blur="cancel">
              推文
            </button>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'addNewTweetModal',
  data () {
    return {
      newTweet: '',
      isLengthError: false
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('toggleAddNewTweetModal')
    },
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
    ...mapState(['openAddNewTweetModal']),
    errorMessage () {
      if (this.newTweet.length === 0) return '字數不可為 0'
      if (this.newTweet.length > 140) return '字數不可超過 140 字'
      return ''
    }
  },
  filters: {
    userAccount (account) {
      return `@${account}`
    }
  },
  watch: {
    openAddNewTweetModal: function () {
      this.$refs.replySection.focus()
    }
  }
}
</script>

<style>

</style>
