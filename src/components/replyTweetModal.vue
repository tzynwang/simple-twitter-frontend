<template>
  <transition name="fade">
    <div class="modal-background">
      <div class="modal">
        <!-- header -->
        <div class="modal-header">
          <img class="ml-15" src="@/assets/images/modal-close.svg" alt="close modal" @click="closeModal">
        </div>
        <!-- tweet to be reply -->
        <div class="modal-body tweet-component">
          <div class="tweet-component-avatar modal-reply-avatar-tail">
            <img class="avatar-img mt-15 ml-15 mr-10" src="" alt="user avatar" />
          </div>
          <div class="tweet-component-content">
            <div class="header mt-15">
              <span class="user-name mr-5">userName</span>
              <span class="user-account">{{ "aUserAccount" | userAccount }}</span>
              <span class="time-stamp">timeStamp</span>
            </div>
            <div class="body mt-6 mb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolorum
              corporis culpa cumque, ut dolorem voluptates assumenda temporibus
              laboriosam quae quibusdam fugiat vero amet omnis tenetur ea deserunt
              accusantium? Porro.
            </div>
            <div class="modal-reply-footer mb-20">
              回覆給 <span class="text-primary">{{ "aUserAccount" | userAccount }}</span>
            </div>
          </div>
        </div>
        <!-- reply section -->
        <div class="modal-input-section">
          <section class="add-new-tweet">
            <textarea v-model.trim="newTweet" placeholder="推你的回覆" ref="replySection"></textarea>
            <img class="avatar-img" src="" alt="avatar" />
            <span v-show="isLengthError" class="error-message">{{ errorMessage }}</span>
            <button class="btn btn-primary btn-new-tweet" @click="addNewTweet" @blur="cancel">
              回覆
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
  name: 'replyTweetModal',
  data () {
    return {
      newTweet: '',
      isLengthError: false
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('toggleReplyModal')
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
    ...mapState(['openReplyModal']),
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
    openReplyModal: function () {
      this.$refs.replySection.focus()
    }
  }
}

</script>

<style>

</style>
