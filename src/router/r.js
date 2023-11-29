export const routeList = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
      },
      {
        path: 'componentDisplay',
        component: () => import('@/views/componentDisplay.vue'),
        children: [
          {
            path: 'tableDisplay',
            component: () => import('@/views/componentDisplay/tableDisplay.vue'),
          },
        ],
      },
      {
        path: 'practice',
        component: () => import('@/views/practice.vue'),
        children: [
          {
            path: 'dragsort',
            component: () => import('@/views/practice/dragsort.vue'),
          },
        ],
      },
    ],
  },
 
] 