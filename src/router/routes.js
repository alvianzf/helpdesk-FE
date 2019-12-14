
export default [
  {
    path: '/',
    name: 'home',
    component: () => lazyLoadView(import('@views/dashboard/dashboard')),
    meta: {
      // authRequired: true,
      title: 'Dashboard',
    }
  },
  {
    path: '/chat/list',
    name: 'chat.list',
    component: () => lazyLoadView(import('@views/chat/list')),
    meta: {
      // authRequired: true,
      title: 'Chat List',
    }
  },
  {
    path: '/chat/detail',
    name: 'chat.detail',
    component: () => lazyLoadView(import('@views/chat/detail')),
    meta: {
      // authRequired: true,
      title: 'Chat Detail',
    }
  },
  {
    path: '/user-management/admin',
    name: 'user.admin',
    component: () => lazyLoadView(import('@views/admin/list')),
    meta: {
      // authRequired: true,
      title: 'List Administrator',
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
