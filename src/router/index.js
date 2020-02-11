import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/misc/Page404')
const Login = () => import('@/views/auth/Login')

// Views - Agent
const Super = () => import('@/views/agent/Super')
const Admin = () => import('@/views/agent/Admin')
const Operator = () => import('@/views/agent/Operator')

// Views - Website
const Website = () => import('@/views/Website')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Dashboard',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
      ]
    },
    {
      path : '/agent',
      redirect : '/agent/super-admin',
      name : 'Agent',
      component: DefaultContainer,
      children: [
        {
          path : '/agent/super-admin',
          name : 'Super Admin',
          component: Super
        },
        {
          path : '/agent/admin',
          name : 'Admin',
          component: Admin
        },
        {
          path : '/agent/operator',
          name : 'Operator',
          component: Operator
        }
      ]
    },
    {
      path : '/website',
      redirect : '/website',
      name : 'Website',
      component: DefaultContainer,
      children: [
        {
          path : '/website',
          name : 'Website List',
          component: Website
        }
      ]
    },
    {
      path : '/auth/login',
      name : 'Login',
      component: Login
    },
    { path: '*',
      component : Page404
    }
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
