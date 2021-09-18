const state = {
  popularUsers: []
}

const getters = {
  getPopularUsers: state => state.popularUsers
}

const actions = {
  setPopularUsers ({ commit }, popularUsers) {
    commit('updatePopularUsers', popularUsers)
  },
  togglePopularUsersFollowStatus ({ commit }, userId) {
    commit('updatePopularUsersFollowStatus', userId)
  }
}

const mutations = {
  updatePopularUsers: (state, popularUsers) => {
    state.popularUsers = popularUsers
  },
  updatePopularUsersFollowStatus: (state, userId) => {
    state.popularUsers.forEach(user => {
      if (user.id === userId) {
        user.isFollowings = !user.isFollowings
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
