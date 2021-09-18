const state = {
  following: []
}

const getters = {
  getFollowing: state => state.following
}

const actions = {
  setFollowing ({ commit }, following) {
    commit('updateFollowing', following)
  },
  addFollowing ({ commit }, newFollowing) {
    commit('addFollowing', newFollowing)
  },
  removeFollowing ({ commit }, userId) {
    commit('removeFollowing', userId)
  }
}

const mutations = {
  updateFollowing: (state, following) => {
    state.following = following
  },
  addFollowing: (state, newFollowing) => {
    const result = state.following.filter(user => user.followingId === newFollowing.followingId)
    // 已經存在state.following中的話，修改isFollowings狀態即可，反之則新增該追蹤者至state.following中
    if (result.length) {
      result[0].isFollowings = true
    } else {
      state.following.push(newFollowing)
    }
  },
  removeFollowing: (state, userId) => {
    state.following.forEach(user => {
      if (user.followingId === userId) {
        user.isFollowings = false
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
