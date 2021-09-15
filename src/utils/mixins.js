import isLength from 'validator/lib/isLength'
import { successToast, failToast } from './../utils/toasts'

export const accountStringFilter = {
  filters: {
    userAccount (account) {
      return `@${account}`
    }
  }
}

// for addNewTweet.vue, addNewTweetModal.vue
export const addNewTweet = {
  methods: {
    addNewTweet (addTweetFrom) {
      if (!isLength(this.newTweet, { min: 1, max: 140 })) {
        this.errorMessage = '推文長度限制在1至140字之間'
        this.isLengthError = true
        this.displayErrorMessage = true
        return
      }

      try {
        this.isLengthError = false
        // 送後端 POST https://localhost:3000/api/tweets
        // 後端確認新增成功後，將推文內容新增到前端的推文陣列中

        // 測試用
        console.log(this.newTweet.length, this.newTweet)

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
      // 不論是一般使用者或是admin一律都是清空token
      // 再根據身分決定推到/login或/admin/login

      // 測試用
      console.log('logout')
    }
  }
}
