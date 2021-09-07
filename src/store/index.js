import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: -1
  },
  mutations: {
    setWindowWidth (state, width) {
      state.windowWidth = width
    }
  },
  actions: {
  },
  modules: {
  }
})
