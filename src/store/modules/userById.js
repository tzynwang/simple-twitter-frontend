// 主要運用在使用者瀏覽到UserAllTweets等路由時，需要根據路由中的id取該頁面的使用者相關資料

const state = {
  user: {
    id: -1,
    account: '',
    avatar: '',
    cover: '',
    introduction: '',
    name: '',
    totalFollowers: 0,
    totalFollowings: 0,
    totalTweets: 0,
    isSubscribing: null
  },
  tweets: [],
  likes: [],
  following: [],
  followers: []
}

const getters = {
  getUserByIdVuex: state => state.user,
  getTweetsByUserIdVuex: state => state.tweets,
  getLikesByUserIdVuex: state => state.likes,
  getFollowingByUserIdVuex: state => state.following,
  getFollowersByUserIdVuex: state => state.followers
}

const actions = {
  setUserById ({ commit }, user) {
    commit('updateUserById', user)
  },
  setTweetsByUserId ({ commit }, tweets) {
    commit('updateTweetsByUserId', tweets)
  },
  addTweetToUserById ({ commit }, tweet) {
    commit('addTweetToUserById', tweet)
  },
  setLikesByUserId ({ commit }, likes) {
    commit('updateLikesByUserId', likes)
  },
  setFollowingByUserId ({ commit }, following) {
    commit('updateFollowingByUserId', following)
  },
  setFollowersByUserId ({ commit }, followers) {
    commit('updateFollowersByUserId', followers)
  },
  addLikeToTweetByUserId ({ commit }, tweetId) {
    commit('addLikeToTweetByUserId', tweetId)
  },
  removeLikeFromTweetByUserId ({ commit }, { tweetId, from }) {
    commit('removeLikeFromTweetByUserId', { tweetId, from })
  },
  addReplyToTweetByUserId ({ commit }, tweetId) {
    commit('addReplyToTweetByUserId', tweetId)
  },
  addTotalFollowers ({ commit }) {
    commit('addTotalFollowers')
  },
  addTotalFollowings ({ commit }) {
    commit('addTotalFollowings')
  },
  minusTotalFollowers ({ commit }) {
    commit('minusTotalFollowers')
  },
  minusTotalFollowings ({ commit }) {
    commit('minusTotalFollowings')
  },
  startSubscribe ({ commit }) {
    commit('startSubscribe')
  },
  stopSubscribe ({ commit }) {
    commit('stopSubscribe')
  }
}

const mutations = {
  updateUserById: (state, user) => {
    state.user = {
      ...state.user,
      ...user
    }
  },
  updateTweetsByUserId: (state, tweets) => {
    state.tweets = tweets
  },
  addTweetToUserById: (state, tweet) => {
    state.tweets.unshift(tweet)
  },
  updateLikesByUserId: (state, likes) => {
    state.likes = likes
  },
  updateFollowingByUserId: (state, following) => {
    state.following = following
  },
  updateFollowersByUserId: (state, followers) => {
    state.followers = followers
  },
  addLikeToTweetByUserId: (state, tweetId) => {
    state.tweets.forEach(tweet => {
      if (tweet.id === tweetId) {
        tweet.totalLikes += 1
        tweet.isLiked = !tweet.isLiked
      }
    })
  },
  removeLikeFromTweetByUserId: (state, { tweetId, from }) => {
    switch (from) {
      case 'tweets':
        state.tweets.forEach(tweet => {
          if (tweet.id === tweetId) {
            tweet.totalLikes -= 1
            tweet.isLiked = !tweet.isLiked
          }
        })
        break
      case 'likes':
        state.likes = state.likes.filter(tweet => tweet.TweetId !== tweetId)
    }
  },
  addReplyToTweetByUserId: (state, tweetId) => {
    state.tweets.forEach(tweet => {
      if (tweet.id === tweetId) {
        tweet.totalReplies += 1
      }
    })
    state.likes.forEach(tweet => {
      if (tweet.TweetId === tweetId) {
        tweet.totalReplies += 1
      }
    })
  },
  addTotalFollowers: (state) => {
    state.user.totalFollowers += 1
  },
  addTotalFollowings: (state) => {
    state.user.totalFollowings += 1
  },
  minusTotalFollowers: (state) => {
    state.user.totalFollowers -= 1
  },
  minusTotalFollowings: (state) => {
    state.user.totalFollowings -= 1
  },
  startSubscribe: (state) => {
    state.user.isSubscribing = true
  },
  stopSubscribe: (state) => {
    state.user.isSubscribing = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
