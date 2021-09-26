<template>
  <!-- 公開聊天室 -->
  <div
    v-if="titleFromParent"
    :class="['nav-top', { 'flex-justify-between': titleFromParent }]"
  >
    {{ titleFromParent }}
    <img
      v-if="fullPath === '/direct-message'"
      class="mr-15 cursor-pointer"
      src="@/assets/images/chat-dm-selector.svg"
      alt=""
    />
  </div>
  <!-- 私人訊息 -->
  <div v-else-if="userFromParent" class="nav-top">
    <div class="title ml-15" v-show="userFromParent.id !== -1">
      <div class="user-name">{{ userFromParent.name }}</div>
      <div class="tweet-counts">{{ userFromParent.account | userAccount }}</div>
    </div>
  </div>
  <!-- 純title -->
  <div v-else class="nav-top">{{ fullPath | title }}</div>
</template>

<script>
import { accountStringFilter } from '@/utils/mixins'

export default {
  name: 'navTop',
  props: ['titleFromParent', 'userFromParent'],
  mixins: [accountStringFilter],
  created () {
    const { fullPath } = this.$route
    this.fullPath = fullPath
  },
  data () {
    return {
      fullPath: ''
    }
  },
  filters: {
    title (fullPath) {
      switch (fullPath) {
        case '/home':
          return '首頁'
        case '/settings':
          return '帳戶設定'
        case '/admin/tweets':
          return '推文清單'
        case '/admin/users':
          return '使用者列表'
        case '/chat':
          return '聊天室'
      }
    }
  }
}
</script>

<style></style>
