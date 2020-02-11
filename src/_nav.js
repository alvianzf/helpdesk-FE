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
  ]
}
