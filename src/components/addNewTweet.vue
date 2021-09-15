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
import { addNewTweet } from '@/utils/mixins'

export default {
  name: 'addNewTweet',
  mixins: [addNewTweet],
  data () {
    return {
      newTweet: '',
      isLengthError: true,
      errorMessage: '',
      displayErrorMessage: false
    }
  }
}
</script>

<style></style>
