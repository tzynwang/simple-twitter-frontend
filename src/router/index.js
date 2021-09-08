import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
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
        component: () => import('../views/AdminLogin.vue')
      },
      {
        path: 'tweets',
        name: 'AdminAllTweets',
        component: () => import('../views/AdminAllTweets.vue')
      },
      {
        path: 'users',
        name: 'AdminAllUsers',
        component: () => import('../views/AdminAllUsers.vue')
      },
      {
        path: '*',
        redirect: '/admin/tweets'
      }
    ]
  },
  {
    path: '/:userId',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: '/',
        name: 'UserAllTweets',
        component: () => import('../views/UserAllTweets.vue')
      },
      {
        path: 'replies',
        name: 'UserReplies',
        component: () => import('../views/UserReplies.vue')
      },
      {
        path: 'likes',
        name: 'UserLikes',
        component: () => import('../views/UserLikes.vue')
      },
      {
        path: 'following',
        name: 'UserFollowing',
        component: () => import('../views/UserFollowing.vue')
      },
      {
        path: 'followers',
        name: 'UserFollowers',
        component: () => import('../views/UserFollowers.vue')
      }
    ]
  },
  {
    path: '/:userId/:tweetId',
    name: 'Tweet',
    component: () => import('../views/ReplyTweet.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
