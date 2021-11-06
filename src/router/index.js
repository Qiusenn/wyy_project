import Vue from 'vue'
import VueRouter from 'vue-router'
import Hot from '../views/Hot'
import Search from '../views/Search'
import SongRecommend from '../views/SongRecommend'
import SongCarList from '../views/SongCarList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/hot',
    component: Hot,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    component: Search,
    meta: { requiresAuth: true }
  },
  {
    path: '/songrecommend',
    component: SongRecommend,
    meta: { requiresAuth: true }
  },
  {
    path: '/songcarlist',
    component: SongCarList
  },
  {
    path: '/',
    redirect: '/songrecommend',
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
