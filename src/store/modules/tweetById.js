// 應用在單一特定推文頁面

const state = {
  tweetInPage: {
    description: '',
    id: -1,
    isLiked: '',
    totalLike: -1,
    totalReply: -1,
    updatedAt: ''
  },
  repliesInPage: []
}

const getters = {
  getTweetInPage: state => state.tweetInPage,
  getRepliesInPage: state => state.repliesInPage
}

const actions = {
  setTweetInPage ({ commit }, tweet) {
    commit('updateTweetInPage', tweet)
  },
  setRepliesInPage ({ commit }, replies) {
    commit('updateRepliesInPage', replies)
  },
  addReplyToRepliesInPage ({ commit }, replies) {
    commit('addReplyToRepliesInPage', replies)
  },
  addTotalReplyCount ({ commit }) {
    commit('addTotalReplyCount')
  },
  addLikeToTweetInPage ({ commit }) {
    commit('modifyLikeToTweetInPage', 1)
  },
  removeLikeFromTweetInPage ({ commit }) {
    commit('modifyLikeToTweetInPage', -1)
  }
}

const mutations = {
  updateTweetInPage: (state, tweet) => {
    state.tweetInPage = tweet
  },
  updateRepliesInPage: (state, replies) => {
    state.repliesInPage = replies
  },
  addReplyToRepliesInPage: (state, replies) => {
    state.repliesInPage.push(replies)
  },
  addTotalReplyCount: (state) => {
    state.tweetInPage.totalReply += 1
  },
  modifyLikeToTweetInPage: (state, count) => {
    state.tweetInPage.totalLike += count
    state.tweetInPage.isLiked = !state.tweetInPage.isLiked
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
