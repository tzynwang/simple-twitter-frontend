import { apiHelper } from '@/utils/apis'

export default {
  getAllTweets () {
    return apiHelper.get('/tweets')
  },
  addReplyToTweet (tweetId, comment) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, comment)
  }
}
