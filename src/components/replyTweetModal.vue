<template>
  <transition name="fade">
    <div class="modal-background">
      <div class="modal">
        <!-- header -->
        <div class="modal-header">
          <img
            class="ml-15"
            src="@/assets/images/modal-close.svg"
            alt="close modal"
            @click="closeModal"
          />
        </div>
        <!-- tweet to be reply -->
        <div class="modal-body tweet-component">
          <div class="tweet-component-avatar modal-reply-avatar-tail">
            <img
              class="avatar-img mt-15 ml-15 mr-10"
              :src="repliedTweet.User.avatar"
              alt="user avatar"
            />
          </div>
          <div class="tweet-component-content">
            <div class="header mt-15">
              <span class="user-name mr-5">{{ repliedTweet.User.name }}</span>
              <span class="user-account">{{
                repliedTweet.User.account | userAccount
              }}</span>
              <span class="time-stamp">{{
                repliedTweet.createdAt | fromNow
              }}</span>
            </div>
            <div class="body mt-6 mb-16">
              {{ repliedTweet.description }}
            </div>
            <div class="modal-reply-footer mb-20">
              回覆給
              <span
                @click="closeModalandPush"
                class="text-primary cursor-pointer"
                >{{ repliedTweet.User.account | userAccount }}</span
              >
            </div>
          </div>
        </div>
        <!-- reply section -->
        <div class="modal-input-section">
          <section class="add-new-tweet">
            <textarea
              v-model.trim="newTweet"
              placeholder="推你的回覆"
              ref="replySection"
            ></textarea>
            <img class="avatar-img" :src="getUser.avatar" alt="avatar" />
            <span v-show="isLengthError" class="error-message">{{
              errorMessage
            }}</span>
            <button
              class="btn btn-primary btn-new-tweet"
              @click="addNewTweet(repliedTweet.id)"
              @blur="cancel"
              :disabled="isLengthError"
            >
              回覆
            </button>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import isLength from 'validator/lib/isLength'
import { mapState, mapGetters, mapActions } from 'vuex'

import { accountStringFilter, timeFilter } from '@/utils/mixins'
import { successToast, failToast } from '@/utils/toasts'
import tweetAPI from '@/apis/tweet'

export default {
  name: 'replyTweetModal',
  mixins: [accountStringFilter, timeFilter],
  data () {
    return {
      repliedTweet: {
        id: -1,
        description: '',
        createdAt: '',
        User: {
          id: -1,
          name: '',
          account: '',
          avatar: ''
        }
      },
      newTweet: '',
      errorMessage: '',
      isLengthError: true,
      isProcessing: false
    }
  },
  methods: {
    ...mapActions([
      'addReplyToTweet',
      'addReplyToTweetByUserId',
      'addReplyToRepliesInPage',
      'addTotalReplyCount'
    ]),
    closeModal () {
      this.$store.commit('toggleReplyModal')
      this.newTweet = ''
      this.repliedTweet = {
        id: -1,
        description: '',
        createdAt: '',
        User: {
          id: -1,
          name: '',
          account: '',
          avatar: ''
        }
      }
    },
    closeModalandPush () {
      const userId = this.repliedTweet.User.id
      this.closeModal()
      this.$router
        .push({ name: 'UserAllTweets', params: { userAccount: userId } })
        .catch(() => {})
    },
    async addNewTweet (tweetId) {
      if (this.isProcessing) return

      if (!isLength(this.newTweet, { min: 1, max: 140 })) {
        this.isLengthError = true
        return
      }

      // 長度符合規範，送後端
      this.isProcessing = true
      try {
        const { data } = await tweetAPI.addReplyToTweet(tweetId, {
          comment: this.newTweet
        })

        if (data.status !== '200') {
          throw new Error(data.message)
        }

        // 更新vuex tweets與userById中該推文的回覆數量
        this.addReplyToTweet(tweetId)
        this.addReplyToTweetByUserId(tweetId)

        // 更新vuex tweetById中的repliesInPage與totalReply數量
        this.addReplyToRepliesInPage({
          User: {
            account: this.getUserByIdVuex.account,
            avatar: this.getUserByIdVuex.avatar,
            id: this.getUserByIdVuex.id,
            name: this.getUserByIdVuex.name
          },
          comment: this.newTweet,
          updatedAt: new Date()
        })
        this.addTotalReplyCount()

        this.closeModal()
        this.isProcessing = false

        successToast.fire({
          title: '回覆成功'
        })
      } catch (error) {
        failToast.fire({
          title: '無法回覆推文'
        })
        this.isProcessing = false
      }
    },
    cancel () {
      this.isLengthError = false
    }
  },
  computed: {
    ...mapState(['openReplyModal', 'replyToTweetId']),
    ...mapGetters([
      'getTweets',
      'getUser',
      'getUserByIdVuex',
      'getTweetsByUserIdVuex',
      'getLikesByUserIdVuex',
      'getTweetInPage'
    ])
  },
  watch: {
    openReplyModal: function () {
      this.$refs.replySection.focus()

      // 過濾/home的全部推文
      const result1 = this.getTweets.filter(
        (tweet) => tweet.id === this.replyToTweetId
      )
      // 過濾某userId的全部推文
      const result2 = this.getTweetsByUserIdVuex.filter(
        (tweet) => tweet.id === this.replyToTweetId
      )
      // 過濾某userId讚過的推文
      const result3 = this.getLikesByUserIdVuex.filter(
        (tweet) => tweet.TweetId === this.replyToTweetId
      )

      // 放有篩出結果的，使用2與3需額外引用getUserByIdVuex資料
      if (result1.length) {
        this.repliedTweet = result1[0]
      } else if (result2.length) {
        this.repliedTweet = {
          id: result2[0].id,
          description: result2[0].description,
          createdAt: result2[0].createdAt,
          User: {
            id: this.getUserByIdVuex.id,
            name: this.getUserByIdVuex.name,
            account: this.getUserByIdVuex.account,
            avatar: this.getUserByIdVuex.avatar
          }
        }
      } else if (result3.length) {
        this.repliedTweet = {
          id: result3[0].TweetId,
          description: result3[0].description,
          createdAt: result3[0].createdAt,
          User: {
            ...result3[0].User
          }
        }
      } else {
        // 以下為「在單一推文頁面（ReplyTweet.vue）回推」的狀況
        this.repliedTweet = {
          id: this.getTweetInPage.id,
          description: this.getTweetInPage.description,
          createdAt: this.getTweetInPage.updatedAt,
          User: {
            id: this.getUserByIdVuex.id,
            name: this.getUserByIdVuex.name,
            account: this.getUserByIdVuex.account,
            avatar: this.getUserByIdVuex.avatar
          }
        }
      }
    },
    newTweet: function (value) {
      if (value.length === 0) {
        this.errorMessage = '字數不可為 0'
        this.isLengthError = true
      } else if (value.length > 140) {
        this.errorMessage = '字數不可超過 140 字'
        this.isLengthError = true
      } else {
        this.isLengthError = false
      }
    }
  }
}
</script>

<style></style>
