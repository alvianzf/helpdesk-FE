import Vue from 'vue'
import Router from 'vue-router'
import Auth from './auth'
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

// Views - Widget
const List = () => import('@/views/widget/List')
const Add = () => import('@/views/widget/Add')
const Edit = () => import('@/views/widget/Edit')
const Splash = () => import('@/views/widget/Splash')
const Trigger = () => import('@/views/widget/Trigger')
const Reminder = () => import('@/views/widget/Reminder')
const GuideWidget = () => import('@/views/widget/Guide')
// Views - User
const AccountPage = () => import('@/views/account/Index')

// Views - Chat
const NewChat = () => import('@/views/chat/New')
const CurrentChat = () => import('@/views/chat/Current')
const HistoryChat = () => import('@/views/chat/History')

const Help = () => import('@/views/guide/Index')

const Sugget = () => import('@/views/Suggest')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      name: 'Dashboard',
      component: DefaultContainer,
      beforeEnter: Auth,
      children: [
        {
          path: '/',
          name: 'Default',
          component: Dashboard
        },
        {
          path: 'account',
          name: 'Account Page',
          component: AccountPage
        },
      ]
    },
    {
      path: '/live-chat',
      redirect: '/live-chat/new',
      name: 'Live Chat',
      beforeEnter: Auth,
      component: DefaultContainer,
      children: [
        {
          path: '/live-chat/new',
          name: 'New',
          component: NewChat
        },
        {
          path: '/live-chat/current',
          name: 'Current',
          component: CurrentChat
        },
        {
          path: '/live-chat/history',
          name: 'History',
          component: HistoryChat
        }
      ]
    },
    {
      path : '/agent',
      redirect : '/agent/super-admin',
      name : 'Agent',
      beforeEnter: Auth,
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
      beforeEnter: Auth,
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
      path : '/shortcut',
      redirect : '/shortcut',
      name : 'Shorcut',
      beforeEnter: Auth,
      component: DefaultContainer,
      children: [
        {
          path : '/shortcut',
          name : 'Shortcut List',
          component: Sugget
        }
      ]
    },
    {
      path : '/widget',
      redirect : '/widget/list',
      name : 'Widget',
      beforeEnter: Auth,
      component: DefaultContainer,
      children: [
        {
          path : '/widget/add',
          name : 'Add Widget',
          component: Add
        },
        {
          path : '/widget/list',
          name : 'Widget List',
          component: List
        },
        {
          path : '/widget/edit/:id',
          name : 'Widget Edit',
          component: Edit
        },
        {
          path : '/widget/splash/:id',
          name : 'Widget Splash',
          component: Splash
        },
        {
          path : '/widget/trigger/:id',
          name : 'Widget Trigger',
          component : Trigger
        },
        {
          path : '/widget/reminder/:id',
          name : 'Widget Reminder',
          component : Reminder
        },
        {
          path : '/widget/guide/:id',
          name : 'Guide Widget',
          component : GuideWidget
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
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
