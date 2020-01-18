import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('./views/app'),
    redirect: '/app/dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboard',
        component: () => import('./views/app/dashboard'),
        redirect: '/app/dashboard/start',
        children: [
          { path: 'start', component: () => import('./views/app/dashboard/Dashboard') }
        ]
      },
      {
        path: 'app/single',
        component: () => import(/* webpackChunkName: "single" */ './views/app/single')
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
