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
        },
        {
          name: 'Admin',
          url: '/agent/admin'
        },
        {
          name: 'Operator',
          url: '/agent/operator'
        }
      ]
    },
  ]
}
