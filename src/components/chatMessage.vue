<template>
  <div :class="['chat-message', 'mb-20', { 'flex-justify-end': isMyMessage }]">
    <img
      v-if="!isMyMessage"
      class="avatar-img ml-15 mr-10 mb-15"
      :src="message.user.avatar"
      alt=""
    />
    <div class="message-container mr-15">
      <div :class="['message', isMyMessage ? 'message-self' : 'message-other']">
        {{ message.message }}
      </div>
      <div :class="['timeStamp', { 'flex-justify-end': isMyMessage }]">
        {{ message.createdAt | dateToString }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatMessage',
  props: ['isMyMessage', 'message'],
  filters: {
    dateToString (value) {
      if (!value) return '--'

      const today = new Date()
      const givenDate = new Date(value)

      if ((today.getTime() - givenDate.getTime()) / 1000 < 60) {
        return '剛剛'
      }

      if (today.toDateString() === givenDate.toDateString()) {
        return new Date(value).toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      return new Date(value)
        .toLocaleDateString('zh-TW', {
          year: '2-digit',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        .slice(3)
    }
  }
}
</script>

<style></style>
