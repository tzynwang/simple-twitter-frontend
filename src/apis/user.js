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
  }
}
