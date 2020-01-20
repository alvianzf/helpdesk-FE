import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: '/app/dashboards',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboards',
        component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards'),
        redirect: '/app/dashboards/default',
        children: [
          { path: 'default', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Default') },
          { path: 'analytics', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Analytics') },
          { path: 'ecommerce', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Ecommerce') },
          { path: 'content', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Content') }
        ]
      }
    ]
  },
  {
    path: '/app/chat',
    component: () => import(/* webpackChunkName: "applications" */ './views/app'),
    redirect: '/app/chat/open',
    beforeEnter: AuthRequired,
    children: [
      { path: 'open', component: () => import(/* webpackChunkName: "applications" */ './views/app/chat/open') },
      { path: 'active', component: () => import(/* webpackChunkName: "applications" */ './views/app/chat/active') },
      { path: 'close', component: () => import(/* webpackChunkName: "applications" */ './views/app/chat/close') },
    ]
  },
  {
    path: '/app/website',
    component: () => import(/* webpackChunkName: "applications" */ './views/app'),
    redirect: '/app/website/list',
    beforeEnter: AuthRequired,
    children: [
      { path: 'list', component: () => import(/* webpackChunkName: "applications" */ './views/app/website/list') },
    ]
  },
  {
    path: '/app/agent',
    component: () => import(/* webpackChunkName: "applications" */ './views/app'),
    redirect: '/app/agent/admin',
    beforeEnter: AuthRequired,
    children: [
      { path: 'admin', component: () => import(/* webpackChunkName: "applications" */ './views/app/agent/admin/list') },
      { path: 'operator', component: () => import(/* webpackChunkName: "applications" */ './views/app/agent/operator/list') },
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
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
