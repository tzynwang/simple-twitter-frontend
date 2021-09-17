import { apiHelper } from '@/utils/apis'

export default {
  getAllTweets () {
    return apiHelper.get('/tweets')
  },
  addNewTweet (newTweet) {
    return apiHelper.post('/tweets', newTweet)
  },
  addReplyToTweet (tweetId, comment) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, comment)
  }
}
