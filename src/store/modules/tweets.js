const state = {
  tweets: []
}

const getters = {
  getTweets: state => state.tweets
}

const actions = {
  setTweets ({ commit }, tweets) {
    commit('updateTweets', tweets)
  },
  addNewTweetVuex ({ commit }, tweet) {
    commit('addNewTweet', tweet)
  },
  addLikeToTweet ({ commit }, tweetId) {
    commit('addLikeToTweet', tweetId)
  },
  removeLikeFromTweet ({ commit }, tweetId) {
    commit('removeLikeFromTweet', tweetId)
  },
  addReplyToTweet ({ commit }, tweetId) {
    commit('addReplyToTweet', tweetId)
  }
}

const mutations = {
  updateTweets: (state, tweets) => {
    state.tweets = tweets
  },
  addNewTweet: (state, tweet) => {
    state.tweets.unshift(tweet) // 越新的推文index越小，故使用unshift
  },
  addLikeToTweet: (state, tweetId) => {
    state.tweets.forEach(tweet => {
      if (tweet.id === tweetId) {
        tweet.totalLike += 1
        tweet.isLiked = !tweet.isLiked
      }
    })
  },
  removeLikeFromTweet: (state, tweetId) => {
    state.tweets.forEach(tweet => {
      if (tweet.id === tweetId) {
        tweet.totalLike -= 1
        tweet.isLiked = !tweet.isLiked
      }
    })
  },
  addReplyToTweet: (state, tweetId) => {
    state.tweets.forEach(tweet => {
      if (tweet.id === tweetId) {
        tweet.totalReply += 1
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
