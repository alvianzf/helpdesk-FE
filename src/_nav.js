export default {
  items: [
    {
      title: true,
      name: 'Menu',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: 'Live Chat',
      url: '/live-chat',
      icon: 'fa fa-comments',
      children: [
        {
          name: 'New',
          url: '/live-chat/new',
          icon : 'fa fa-info'
        },
        {
          name: 'Current',
          url: '/live-chat/current',
          icon : 'fa fa-hourglass-end'
        },
        {
          name: 'History',
          url: '/live-chat/history',
          icon : 'fa fa-history'
        }
      ]
    },
    {
      name: 'Agent',
      url: '/agent',
      icon: 'icon-people',
      children: [
        {
          name: 'Super Admin',
          url: '/agent/super-admin',
          icon : 'fa fa-circle'
        },
        {
          name: 'Admin',
          url: '/agent/admin',
          icon : 'fa fa-circle'
        },
        {
          name: 'Operator',
          url: '/agent/operator',
          icon : 'fa fa-circle'
        }
      ]
    },
    {
      name: 'Website',
      url: '/website',
      icon: 'fa fa-globe',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: 'Widget',
      url: '/widget',
      icon: 'fa fa-briefcase',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: 'Help',
      url: '/help',
      icon: 'fa fa-question',
      badge: {
        variant: 'primary'
      }
    }
  ]
}
