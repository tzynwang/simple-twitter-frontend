import Vue from 'vue'
import VueRouter from 'vue-router'

// import store from '@/store'
// import userAPI from '@/apis/user'

Vue.use(VueRouter)

// const authorizeIsAdmin = (to, from, next) => {
//   const currentUser = store.getters.getUser
//   if (currentUser && (currentUser.role !== 'admin')) {
//     next('/not-found')
//     return
//   }
//   next()
// }

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Register'
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      title: 'Settings'
    },
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    caseSensitive: true,
    redirect: '/admin/tweets',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('../views/AdminLogin.vue'),
        meta: {
          title: 'Admin Login'
        }
      },
      {
        path: 'tweets',
        name: 'AdminAllTweets',
        component: () => import('../views/AdminAllTweets.vue'),
        meta: {
          title: 'All Tweets'
        }
        // beforeEnter: authorizeIsAdmin
      },
      {
        path: 'users',
        name: 'AdminAllUsers',
        component: () => import('../views/AdminAllUsers.vue'),
        meta: {
          title: 'All Users'
        }
        // beforeEnter: authorizeIsAdmin
      },
      {
        path: '*',
        redirect: '/admin/tweets'
      }
    ]
  },
  {
    path: '/:userAccount',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: '/',
        name: 'UserAllTweets',
        component: () => import('../views/UserAllTweets.vue'),
        meta: {
          title: 'Personal Page'
        }
      },
      {
        path: 'replies',
        name: 'UserReplies',
        component: () => import('../views/UserReplies.vue'),
        meta: {
          title: 'Personal Page'
        }
      },
      {
        path: 'likes',
        name: 'UserLikes',
        component: () => import('../views/UserLikes.vue'),
        meta: {
          title: 'Personal Page'
        }
      },
      {
        path: 'following',
        name: 'UserFollowing',
        component: () => import('../views/UserFollowing.vue'),
        meta: {
          title: 'Following'
        }
      },
      {
        path: 'followers',
        name: 'UserFollowers',
        component: () => import('../views/UserFollowers.vue'),
        meta: {
          title: 'Followers'
        }
      }
    ]
  },
  {
    path: '/:userAccount/:tweetId',
    name: 'Tweet',
    component: () => import('../views/ReplyTweet.vue'),
    meta: {
      title: 'Tweet'
    }
  },
  {
    alias: '*',
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Not Found'
    }
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach(async (to, from, next) => {
//   const tokenInLocalStorage = window.localStorage.getItem('simpleTweeterToken')
//   const tokenInStore = store.getters.getToken
//   let isAuthenticated = store.getters.getAuthenticated

//   // 先比較localStorage與vuex的token是否「不同」（先 !== 再 &&）
//   // 兩邊不同，且localStorage「有token」的話，透過 getCurrentUser 用token交換該使用者的資料
//   if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
//     const { data } = await userAPI.getCurrentUser()
//     store.dispatch('setUser', data, { root: true })
//     isAuthenticated = store.getters.getAuthenticated
//   }

//   // 列出不需要驗證 token 的頁面
//   const pathsWithoutAuthentication = ['Login', 'Register', 'AdminLogin']

//   // 如果 token 無效且又想進入需要驗證的頁面，轉到/login
//   if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
//     next('/login')
//     return
//   }

//   // 如果 token 有效且又想進入登入註冊頁面，轉到/home
//   if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
//     next('/home')
//     return
//   }

//   // 設定瀏覽器分頁標籤顯示的title
//   document.title = `${to.meta.title} | Simple Tweet`

//   next()
// })

export default router
