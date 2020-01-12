
export default [
  {
    path: '/',
    name: 'home',
    component: () => lazyLoadView(import('@views/dashboard/dashboard')),
    meta: {
      authRequired: true,
      title: 'Dashboard',
    }
  },
  {
    path: '/chat/list/active',
    name: 'chat.active.list',
    component: () => lazyLoadView(import('@views/chat/activelist')),
    meta: {
      authRequired: true,
      title: 'Active Chat List',
    }
  },
  {
    path: '/chat/list/recent',
    name: 'chat.recent.list',
    component: () => lazyLoadView(import('@views/chat/recentlist')),
    meta: {
      authRequired: true,
      title: 'Recent Chat List',
    }
  },
  {
    path: '/chat/detail/:id',
    name: 'chat.detail',
    component: () => lazyLoadView(import('@views/chat/detail')),
    meta: {
      authRequired: true,
      title: 'Chat Detail',
    }
  },
  {
    path: '/user-management/admin',
    name: 'user.admin',
    component: () => lazyLoadView(import('@views/admin/list')),
    meta: {
      authRequired: true,
      title: 'List Administrator',
    }
  },
  {
    path: '/user-management/customer-service',
    name: 'user.customer_service',
    component: () => lazyLoadView(import('@views/customer_service/list')),
    meta: {
      authRequired: true,
      title: 'List Customer Service',
    }
  },
  {
    path: '/website-management',
    name: 'website_management',
    component: () => lazyLoadView(import('@views/website/list')),
    meta: {
      authRequired: true,
      title: 'List Website',
    }
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    component: () => lazyLoadView(import('@views/auth/login')),
    meta: {
      // authRequired: true,
      title: 'Login Page',
    }
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404').default,
    props: true,
  },
  {
    path: '*',
    redirect: '404',
  },
]

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: require('@views/_loading').default,
    delay: 400,
    error: require('@views/_timeout').default,
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      return h(AsyncHandler, data, children)
    },
  })
}
