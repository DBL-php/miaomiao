import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie' 
import mimeRouter from './mime' 
import cinemaRouter from './cinema' 
import adminRouter from './admin' 



Vue.use(VueRouter)

const routes = [
  movieRouter,
  adminRouter,
  cinemaRouter,
  mimeRouter,
  {
    path : '/*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
