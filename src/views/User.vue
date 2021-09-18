<template>
  <main class="container">
    <template v-if="windowWidth < 768">
      <router-view />
      <navBottom />
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
      <editProfileModal v-show="openEditProfileModal" />
    </template>
    <template v-else-if="windowWidth >= 768 && windowWidth < 1200">
      <navLeft />
      <router-view />
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
      <editProfileModal v-show="openEditProfileModal" />
    </template>
    <template v-else>
      <navLeftDesktop />
      <router-view />
      <popularList />
      <addNewTweetModal v-show="openAddNewTweetModal" />
      <replyTweetModal v-show="openReplyModal" />
      <editProfileModal v-show="openEditProfileModal" />
    </template>
  </main>
</template>

<script>
import navBottom from '@/components/navBottom'
import addNewTweetModal from '@/components/addNewTweetModal'
import replyTweetModal from '@/components/replyTweetModal'
import editProfileModal from '@/components/editProfileModal'

// tablet
import navLeft from '@/components/navLeft'

// desktop
import navLeftDesktop from '@/components/navLeftDesktop'
import popularList from '@/components/popularList'

import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    navBottom,
    addNewTweetModal,
    replyTweetModal,
    editProfileModal,
    navLeft,
    navLeftDesktop,
    popularList
  },
  computed: {
    ...mapState(['windowWidth', 'openAddNewTweetModal', 'openReplyModal', 'openEditProfileModal'])
  }
}
</script>
