import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authenticatedGuard } from './authenticated-guard'
import { unauthenticatedGuard } from './unauthenticated-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'tasks',
          component: () => import('../views/TasksView.vue'),
        },
        {
          path: '/:id',
          name: 'taskDetail',
          component: () => import('../views/TaskView.vue'),
          props: true,
        },
      ],
      beforeEnter: [authenticatedGuard],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: [unauthenticatedGuard],
    },
    { path: '/:catchAll(.*)', component: () => import('../views/NotFoundView.vue') },
  ],
})

export default router
