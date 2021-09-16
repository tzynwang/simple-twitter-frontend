import Vue from 'vue'
import Vuex from 'vuex'

import authorization from './modules/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: -1,
    openAddNewTweetModal: false,
    openReplyModal: false,
    openEditProfileModal: false
  },
  mutations: {
    setWindowWidth (state, width) {
      state.windowWidth = width
    },
    toggleAddNewTweetModal (state) {
      state.openAddNewTweetModal = !state.openAddNewTweetModal
    },
    toggleReplyModal (state) {
      state.openReplyModal = !state.openReplyModal
    },
    toggleEditProfileModal (state) {
      state.openEditProfileModal = !state.openEditProfileModal
    }
  },
  actions: {
  },
  modules: {
    authorization
  }
})
