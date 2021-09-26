import { apiHelper } from '@/utils/apis'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current')
  },
  getCurrentUserRepliedTweets (currentUserId) {
    return apiHelper.get(`/users/${currentUserId}/replied_tweets`)
  },
  addLikeToTweet (tweetId) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  removeLikeFromTweet (tweetId) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  },
  getUserById (userId) {
    return apiHelper.get(`/users/${userId}`)
  },
  getAllTweetsById (userId) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getAllRepliesById (userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getAllLikesById (userId) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  startFollow (targetUserId) {
    return apiHelper.post('/followships', targetUserId)
  },
  stopFollow (targetUserId) {
    return apiHelper.delete(`/followships/${targetUserId}`)
  },
  startSubscribe (targetUserId) {
    return apiHelper.post('/subscribeships', targetUserId)
  },
  stopSubscribe (targetUserId) {
    return apiHelper.delete(`/subscribeships/${targetUserId}`)
  },
  getPopularUsers () {
    return apiHelper.get('/users/top')
  },
  getAllFollowing (userId) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getAllFollowers (userId) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  editUserProfile (userId, profile) {
    return apiHelper.put(`/users/${userId}`, profile)
  },
  getAdminAllUsers () {
    return apiHelper.get('/admin/users')
  }
}
