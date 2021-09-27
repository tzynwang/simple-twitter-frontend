import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import isLength from 'validator/lib/isLength'

import { successToast, failToast } from '@/utils/toasts'
import tweetAPI from '@/apis/tweet'
import userAPI from '@/apis/user'

export const accountStringFilter = {
  filters: {
    userAccount (account) {
      return `@${account}`
    }
  }
}

export const timeFilter = {
  filters: {
    fromNow (timeStamp) {
      return timeStamp ? moment(timeStamp).fromNow() : '--'
    }
  }
}

export const contentFilter = {
  filters: {
    contentOverFlow (content) {
      if (content.length > 50) return content.slice(0, 49) + '...'
      return content
    }
  }
}

// for Home.vue, popularList.vue
export const fetchAllTweetsMixins = {
  methods: {
    ...mapActions(['setTweets', 'setFollowing', 'setPopularUsers']),
    async fetchAllTweets () {
      try {
        const { data } = await tweetAPI.getAllTweets()
        this.setTweets(data)
        this.fetchAllTweetsDone = true
      } catch (error) {
        failToast.fire({
          title: '無法取得推文，請稍候再試'
        })
      }
    },
    async fetchAllFollowing () {
      try {
        // 取currentUser的追蹤資料
        const { data } = await userAPI.getAllFollowing(this.getUser.id)
        this.setFollowing(data)
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得追蹤清單，請稍候再試'
        })
      }
    },
    async fetchPopularUsers () {
      try {
        const { data } = await userAPI.getPopularUsers()
        this.setPopularUsers(data)
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得人氣帳號，請稍候再試'
        })
      }
    },
    // 以下為Home.vue中捲動顯示tweets的相關段落
    sliceTweet (array) {
      if (!this.tweets) return

      const result = array.slice(this.start, this.end)
      this.tweets.push(...result)
      this.start += this.tweetPerPage
      this.end += this.tweetPerPage
    },
    scrollBottomShowTweet () {
      if (!this.$refs.tweetContainer) return
      if (
        this.$refs.tweetContainer.offsetHeight +
          this.$refs.tweetContainer.scrollTop >=
        this.$refs.tweetContainer.scrollHeight
      ) {
        this.sliceTweet(this.getTweets)
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getTweets'])
  }
}

// for popularList.vue, userProfile.vue
export const followingMixins = {
  methods: {
    ...mapActions([
      'togglePopularUsersFollowStatus',
      'addFollowing',
      'removeFollowing',
      'addTotalFollowers',
      'minusTotalFollowers',
      'addTotalFollowings',
      'minusTotalFollowings',
      'startSubscribe',
      'stopSubscribe'
    ]),
    async follow ({ user, action }) {
      switch (action) {
        case 1: // 開始跟隨
          try {
            const { data } = await userAPI.startFollow({
              id: user.id
            })
            if (data.status !== '200') throw new Error(data.message)

            // 修改vuex popularUsers的追蹤狀態
            this.togglePopularUsersFollowStatus(user.id)

            // 修改getUserById的追蹤數量
            // 在某人的個人資料頁跟隨某人時，增加某人的追隨者數量
            if (this.getUserByIdVuex.id === user.id) {
              this.addTotalFollowers()
            }
            // 在我的個人資料頁面跟隨某人時，增加追蹤中數量
            if (this.getUserByIdVuex.id === this.getUser.id) {
              this.addTotalFollowings()
            }

            // 新增到vuex following中
            this.addFollowing({
              followingId: user.id,
              name: user.name,
              account: user.account,
              avatar: user.avatar,
              introduction: '', // TODO: 需要後端補資料
              isFollowings: true
            })
          } catch (error) {
            console.error(error)
            failToast.fire({
              title: '無法跟隨該使用者'
            })
          }
          break
        case -1: // 取消跟隨
          try {
            const { data } = await userAPI.stopFollow(user.id)
            if (data.status !== '200') throw new Error(data.message)

            // 修改vuex popularUsers的追蹤狀態
            this.togglePopularUsersFollowStatus(user.id)

            // 修改getUserById的追蹤數量
            // 在某人的個人資料頁取消跟隨某人時，減少某人的追隨者數量
            if (this.getUserByIdVuex.id === user.id) {
              this.minusTotalFollowers()
            }
            // 在我的個人資料頁面取消跟隨某人時，減少我的追蹤中數量
            if (this.getUserByIdVuex.id === this.getUser.id) {
              this.minusTotalFollowings()
            }

            // 修改vuex following資料狀態
            this.removeFollowing(user.id)
          } catch (error) {
            console.error(error)
            failToast.fire({
              title: '無法取消跟隨該使用者'
            })
          }
      }
    },
    async subscribe ({ user, action }) {
      switch (action) {
        case 1: // 開始訂閱
          try {
            const { data } = await userAPI.startSubscribe({
              id: user.id
            })
            if (data.status !== '200') throw new Error(data.message)
            this.startSubscribe()
          } catch (error) {
            console.error(error)
            failToast.fire({
              title: '無法訂閱該使用者'
            })
          }
          break
        case -1: // 取消訂閱
          try {
            const { data } = await userAPI.stopSubscribe(user.id)
            if (data.status !== '200') throw new Error(data.message)
            this.stopSubscribe()
          } catch (error) {
            console.error(error)
            failToast.fire({
              title: '無法取消訂閱該使用者'
            })
          }
      }
    }
  },
  computed: {
    ...mapGetters(['getUserByIdVuex'])
  }
}

// for UserAllTweets.vue, UserLikes.vue, UserReplies.vue, UserFollowing.vue, UserFollowers.vue
export const fetchUserByIdInPathMixins = {
  methods: {
    ...mapActions([
      'setUserById',
      'setTweetsByUserId',
      'setLikesByUserId',
      'setFollowingByUserId',
      'setFollowersByUserId'
    ]),
    async getUserById (userId) {
      try {
        const { data } = await userAPI.getUserById(userId)

        if (data.status !== '200') {
          throw new Error(data.message)
        }

        // 把透過id取得的使用者資料存到vuex中
        this.setUserById(data)
      } catch (error) {
        // 找不到該使用者，跳至NotFound
        this.$router.push({
          name: 'NotFound'
        })
        console.error(error)
        failToast.fire({
          title: '無法取得使用者，請稍候再試'
        })
      }
    },
    async getAllTweetsByUserId (userId) {
      try {
        const { data } = await userAPI.getAllTweetsById(userId)
        // 把透過id取得的該使用者所有推文存到vuex中
        this.setTweetsByUserId(data)
        this.fetchAllTweetsDone = true
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得推文，請稍候再試'
        })
      }
    },
    async getAllLikesByUserId (userId) {
      try {
        const { data } = await userAPI.getAllLikesById(userId)
        // 把透過id取得的該使用者所有回覆存到vuex中
        this.setLikesByUserId(data)
        this.fetchAllTweetsDone = true
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得喜歡的內容，請稍候再試'
        })
      }
    },
    async getAllFollowingByUserId (userId) {
      try {
        const { data } = await userAPI.getAllFollowing(userId)
        // 把透過id取得的該使用者所有正在跟隨存到vuex中
        this.setFollowingByUserId(data)
        this.fetchAllFollowingDone = true
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得跟隨中的內容，請稍候再試'
        })
      }
    },
    async getAllFollowersByUserId (userId) {
      try {
        const { data } = await userAPI.getAllFollowers(userId)
        this.setFollowersByUserId(data)
        this.fetchAllFollowersDone = true
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得跟隨者的內容，請稍候再試'
        })
      }
    }
  }
}

// for addNewTweet.vue, addNewTweetModal.vue
export const addNewTweet = {
  data () {
    return {
      socket: {}
    }
  },
  methods: {
    ...mapActions(['addNewTweetVuex', 'addTweetToUserById']),
    async addNewTweet (addTweetFrom) {
      if (
        !isLength(this.newTweet, {
          min: 1,
          max: 140
        })
      ) {
        this.errorMessage = '推文長度限制在1至140字之間'
        this.isLengthError = true
        this.displayErrorMessage = true
        return
      }

      try {
        this.displayErrorMessage = false
        this.isLengthError = false
        this.isProcessing = true

        const { data } = await tweetAPI.addNewTweet({
          description: this.newTweet
        })

        if (data.status !== '200') {
          throw new Error(data.message)
        }

        // 後端確認新增成功後，將推文內容新增到前端的推文陣列中
        const newTweet = {
          id: data.tweetId,
          UserId: this.getUser.id,
          description: this.newTweet,
          createdAt: new Date(),
          updatedAt: new Date(),
          User: {
            id: this.getUser.id,
            name: this.getUser.name,
            email: this.getUser.email,
            password: '',
            account: this.getUser.account,
            cover: this.getUser.cover,
            avatar: this.getUser.avatar,
            introduction: this.getUser.introduction,
            role: this.getUser.role,
            createdAt: this.getUser.createdAt,
            updatedAt: ''
          }
        }

        this.addNewTweetVuex(newTweet)
        this.$emit('after-add-tweet', newTweet)

        if (this.getUser.id === this.getUserByIdVuex.id) {
          // 在個人頁面新增推文時，需把推文加到allTweets畫面中
          this.addTweetToUserById(newTweet)
        }

        // 推文發出後，清空textarea，disabled推文按鈕
        this.newTweet = ' '
        this.isProcessing = false
        this.$refs.replySection.blur()

        // 如果透過modal新增推文，把modal關掉
        if (addTweetFrom === 'modal') {
          this.closeModal()
        }

        successToast.fire({
          title: '新增推文成功'
        })
      } catch (error) {
        console.error(error.response)

        failToast.fire({
          title: '新增推文失敗'
        })
        this.isLengthError = true
        this.displayErrorMessage = false
        this.isProcessing = false
      }
    },
    cancel () {
      // blur時僅disabled推文按鈕，隱藏錯誤訊息
      this.displayErrorMessage = false
    },
    closeModal () {
      this.newTweet = ''
      this.$store.commit('toggleAddNewTweetModal')
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getUserByIdVuex'])
  },
  watch: {
    newTweet: function (value) {
      if (value.length === 0) {
        this.errorMessage = '內容不可空白'
        this.isLengthError = true
        this.displayErrorMessage = true
      } else if (value.length > 140) {
        this.errorMessage = '字數不可超過 140 字'
        this.isLengthError = true
        this.displayErrorMessage = true
      } else {
        this.isLengthError = false
        this.displayErrorMessage = false
      }
    }
  }
}

// for navLeft.vue, navLeftDesktop.vue, navBottom.vue
// navLeftAdmin.vue, navLeftDesktopAdmin.vue
// navTopArrow.vue, navTopArrowTweetsCount.vue
export const navMethods = {
  methods: {
    ...mapActions(['logoutAction', 'setSocket']),
    toHome () {
      // 這邊不使用router-link實作是因為.router-link-active會給img加上橙色filter
      // 故設計成點擊img後推回/home
      if (this.$route.fullPath === '/home') return
      this.$router.push({
        name: 'Home'
      })
    },
    toAdminAllTweets () {
      // 這邊不使用router-link實作是因為.router-link-active會給img加上橙色filter
      // 故設計成點擊img後推回/home
      if (this.$route.fullPath === '/admin/tweets') return
      this.$router.push({
        name: 'AdminAllTweets'
      })
    },
    backToHome () {
      this.$router.push({
        name: 'Home'
      })
    },
    openAddNewTweetModal () {
      // 打開推文modal
      this.$store.commit('toggleAddNewTweetModal')
    },
    logout () {
      // 先取得登出前的user.role資料
      const role = this.getUser.role
      this.logoutAction()

      // 根據身分決定推到/login或/admin/login
      if (role === 'user') {
        this.$router.push({
          name: 'Login'
        })
      }
      if (role === 'admin') {
        this.$router.push({
          name: 'AdminLogin'
        })
      }

      // socket結束連線，清空vuex socket資料
      this.getSocket.disconnect()
      this.setSocket(null)
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getSocket'])
  }
}
