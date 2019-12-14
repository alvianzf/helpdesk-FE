import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueMeta from 'vue-meta'
// import NProgress from 'nprogress/nprogress'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  keyName: 'page',
})

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})



export default router
