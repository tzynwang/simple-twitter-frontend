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
    component: () => import('../views/Portfolio.vue'),
    children: [
      {
        path: '/',
        name: 'Portfolio',
        component: () => import('../views/PortfolioAllTweets.vue')
      },
      {
        path: 'replies',
        component: () => import('../views/PortfolioReplies.vue')
      },
      {
        path: 'likes',
        component: () => import('../views/PortfolioLikes.vue')
      },
      {
        path: 'following',
        component: () => import('../views/PortfolioFollowing.vue')
      },
      {
        path: 'followers',
        component: () => import('../views/PortfolioFollowers.vue')
      },
      {
        path: '*',
        redirect: '/:userId'
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
