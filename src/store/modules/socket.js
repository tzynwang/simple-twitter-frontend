const state = {
  socket: null
}

const getters = {
  getSocket: state => state.socket
}

const actions = {
  setSocket ({ commit }, socket) {
    commit('updateSocket', socket)
  }
}

const mutations = {
  updateSocket: (state, socket) => {
    state.socket = socket
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
