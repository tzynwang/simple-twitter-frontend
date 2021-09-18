import Vue from 'vue'
import Vuex from 'vuex'

import authorization from './modules/authorization'
import tweets from './modules/tweets'
import follows from './modules/follows'
import popularUsers from './modules/popularUsers'
import userById from './modules/userById'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: -1,
    openAddNewTweetModal: false,
    openReplyModal: false,
    replyToTweetId: -1,
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
    setReplyToTweetId (state, tweetId) {
      state.replyToTweetId = tweetId
    },
    toggleEditProfileModal (state) {
      state.openEditProfileModal = !state.openEditProfileModal
    }
  },
  actions: {
  },
  modules: {
    authorization,
    tweets,
    follows,
    popularUsers,
    userById
  }
})
