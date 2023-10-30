// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home-view.vue'),
      },
      {
        path: '/tasks',
        name: 'tasks',
        component: () => import('@/views/Tasks-view.vue'),
      }
    ],
  },
  {
    path: '/login',
        name: 'login',
        component: () => import('@/views/Login-view.vue'),
  },
  {
    path: '/register',
        name: 'register',
        component: () => import('@/views/Register-view.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFound-view.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
