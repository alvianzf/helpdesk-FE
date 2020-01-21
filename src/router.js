import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: '/app/dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboard',
        component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards'),
        redirect: '/app/dashboards/default',
        children: [
          { path: 'default', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboard/default') },
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
      { path: 'detail/:id', component: () => import(/* webpackChunkName: "applications" */ './views/app/chat/detail'), props : true, name : 'chat.detail' },
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
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') }
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