
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/aaa', component: () => import('pages/aaa') },
      { path: 'system/organization', component: () => import('pages/system/organization') },
      { path: 'system/user', component: () => import('pages/system/user') },
      { path: 'system/role', component: () => import('pages/system/role') },
      { path: 'system/menu', component: () => import('pages/system/menu') },
      { path: 'system/resource', component: () => import('pages/system/resource') }
    ]
  },

  { // Always leave this as last one
    path: '/login',
    component: () => import('pages/login.vue')
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
