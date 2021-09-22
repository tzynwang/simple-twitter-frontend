import { apiHelper } from '@/utils/apis'

export default {
  getAllTweets () {
    return apiHelper.get('/tweets')
  },
  getTweet (tweetId) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getTweetAllReplies (tweetId) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  addNewTweet (newTweet) {
    return apiHelper.post('/tweets', newTweet)
  },
  addReplyToTweet (tweetId, comment) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, comment)
  },
  getAdminTweets () {
    return apiHelper.get('/admin/tweets')
  },
  deleteTweet (tweetId) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  }
}
