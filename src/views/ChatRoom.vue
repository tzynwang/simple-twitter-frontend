<template>
  <main class="container">
    <!-- mobile -->
    <template v-if="windowWidth < 768">
      <navTop :title-from-parent="'公開聊天室'" />
      <section class="container-body">
        <div class="container-message">聊天室</div>
      </section>
      <navBottom />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeft v-if="windowWidth >= 768 && windowWidth < 1200"/>
      <navLeftDesktop v-else />
      <section class="container-chat">
        <div class="online-list">
          <navTop :title-from-parent="getOnlineCounts" />
        </div>
        <div class="chat-room">
          <navTop :title-from-parent="'公開聊天室'" />
          <section class="container-body">
            <div class="container-message">聊天室</div>
          </section>
        </div>
      </section>
    </template>
  </main>
</template>

<script>
import navTop from '@/components/navTop'
import navBottom from '@/components/navBottom'

// tablet
import navLeft from '@/components/navLeft'

// desktop
import navLeftDesktop from '@/components/navLeftDesktop'

import { mapState } from 'vuex'

export default {
  name: 'ChatRoom',
  components: {
    navTop,
    navBottom,
    navLeft,
    navLeftDesktop
  },
  computed: {
    ...mapState(['windowWidth']),
    getOnlineCounts () {
      // TODO: 取出現在上線的人數
      const onlineCount = 5
      return `上線使用者（${onlineCount}）`
    }
  }
}
</script>

<style></style>
