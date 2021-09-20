<template>
  <transition name="fade">
    <div class="modal-background">
      <div class="modal">
        <!-- header -->
        <div class="modal-header">
          <img
            class="ml-15"
            src="@/assets/images/modal-close.svg"
            alt="close modal"
            @click="closeModal"
          />
        </div>
        <!-- reply section -->
        <div class="modal-input-section">
          <section class="add-new-tweet">
            <textarea
              v-model.trim="newTweet"
              placeholder="有什麼新鮮事？"
              ref="replySection"
              @blur="cancel"
            ></textarea>
            <img class="avatar-img" :src="getUser.avatar" alt="avatar" />
            <span v-show="displayErrorMessage" class="error-message">{{
              errorMessage
            }}</span>
            <button
              class="btn btn-primary btn-new-tweet"
              @click="addNewTweet('modal')"
              @blur="cancel"
              :disabled="isLengthError || isProcessing"
            >
              {{ isProcessing ? "請稍候" : "推文" }}
            </button>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { addNewTweet } from '@/utils/mixins'

export default {
  name: 'addNewTweetModal',
  mixins: [addNewTweet],
  data () {
    return {
      newTweet: '',
      isLengthError: true,
      errorMessage: '',
      displayErrorMessage: false,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['openAddNewTweetModal'])
  },
  watch: {
    openAddNewTweetModal: function () {
      this.$refs.replySection.focus()
    }
  }
}
</script>

<style></style>
