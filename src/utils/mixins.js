import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import isLength from 'validator/lib/isLength'

import { successToast, failToast } from './../utils/toasts'
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

export const fetchAllTweetsMixins = {
  methods: {
    ...mapActions(['setTweets']),
    async fetchAllTweets () {
      try {
        const { data } = await tweetAPI.getAllTweets()
        this.setTweets(data)
      } catch (error) {
        failToast.fire({
          title: '無法取得推文，請稍候再試'
        })
      }
    }
  }
}

// for UserAllTweets.vue, UserLikes.vue, UserReplies.vue
export const fetchUserByIdInPathMixins = {
  methods: {
    ...mapActions(['setUserById', 'setTweetsByUserId', 'setLikesByUserId']),
    async getUserById (userId) {
      try {
        const { data } = await userAPI.getUserById(userId)

        if (data.status !== '200') {
          throw new Error(data.message)
        }

        // 把透過id取得的使用者資料存到vuex中
        this.setUserById(data)
      } catch (error) {
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
      } catch (error) {
        console.error(error)
        failToast.fire({
          title: '無法取得推文，請稍候再試'
        })
      }
    }
  }
}

// for addNewTweet.vue, addNewTweetModal.vue
export const addNewTweet = {
  methods: {
    ...mapActions(['addNewTweetVuex']),
    async addNewTweet (addTweetFrom) {
      if (!isLength(this.newTweet, { min: 1, max: 140 })) {
        this.errorMessage = '推文長度限制在1至140字之間'
        this.isLengthError = true
        this.displayErrorMessage = true
        return
      }

      try {
        this.isLengthError = false
        const { data } = await tweetAPI.addNewTweet({
          description: this.newTweet
        })

        if (data.status !== '200') {
          throw new Error(data.message)
        }

        // 後端確認新增成功後，將推文內容新增到前端的推文陣列中
        this.addNewTweetVuex({
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
        })

        successToast.fire({
          title: '新增推文成功'
        })

        // 推文發出後，清空textarea，disabled推文按鈕
        this.newTweet = ''
        this.isLengthError = true
        this.displayErrorMessage = false

        // 如果透過modal新增推文，把modal關掉
        if (addTweetFrom === 'modal') {
          this.closeModal()
        }
      } catch (error) {
        console.error(error.response)

        failToast.fire({
          title: '新增推文失敗'
        })
        this.isLengthError = true
        this.displayErrorMessage = false
      }
    },
    cancel () {
      // blur時僅disabled推文按鈕，隱藏錯誤訊息
      this.displayErrorMessage = false
    },
    closeModal () {
      this.$store.commit('toggleAddNewTweetModal')
    }
  },
  computed: {
    ...mapGetters(['getUser'])
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
    ...mapActions(['logoutAction']),
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
      this.$router.push({ name: 'AdminAllTweets' })
    },
    back () {
      this.$router.go(-1)
    },
    openAddNewTweetModal () {
      // 打開推文modal
      this.$store.commit('toggleAddNewTweetModal')
    },
    logout () {
      const role = this.getUser.role // 先取得登出前的user.role資料
      // 清空token
      this.logoutAction()
      // 根據身分決定推到/login或/admin/login
      if (role === 'user') this.$router.push({ name: 'Login' })
      if (role === 'admin') this.$router.push({ name: 'AdminLogin' })
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
