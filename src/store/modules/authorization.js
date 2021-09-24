const state = {
  token: '',
  user: {
    id: -1,
    name: '',
    email: '',
    account: '',
    cover: '',
    avatar: '',
    introduction: '',
    role: '', // 'user'或'admin'
    createdAt: ''
  },
  isAuthenticated: false
}

const getters = {
  getUser: state => state.user,
  getToken: state => state.token,
  getAuthenticated: state => state.isAuthenticated
}

const actions = {
  setUser ({ commit }, user) {
    commit('updateUser', user)
  },
  setToken ({ commit }, token) {
    commit('updateToken', token)
  },
  logoutAction ({ commit }) {
    commit('logoutUser')
  }
}

const mutations = {
  updateUser: (state, user) => {
    state.isAuthenticated = true
    state.user = {
      ...state.user,
      ...user
    }
  },
  updateToken: (state, token) => {
    state.token = token
    window.localStorage.setItem('simpleTweeterToken', token)
  },
  logoutUser: state => {
    state.token = ''
    state.user = {
      id: -1,
      name: '',
      email: '',
      account: '',
      cover: '',
      avatar: '',
      introduction: '',
      role: '',
      createdAt: ''
    }
    state.isAuthenticated = false
    window.localStorage.removeItem('simpleTweeterToken')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
