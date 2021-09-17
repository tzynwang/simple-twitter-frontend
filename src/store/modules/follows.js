const state = {
  following: []
}

const getters = {
  getFollowing: state => state.following
}

const actions = {
  setFollowing ({ commit }, following) {
    commit('updateFollowing', following)
  }
}

const mutations = {
  updateFollowing: (state, following) => {
    state.following = following
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
