import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: -1,
    openReplyModal: false
  },
  mutations: {
    setWindowWidth (state, width) {
      state.windowWidth = width
    },
    toggleReplyModal (state) {
      state.openReplyModal = !state.openReplyModal
    }
  },
  actions: {
  },
  modules: {
  }
})
