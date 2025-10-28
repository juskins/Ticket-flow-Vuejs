import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import TicketsPage from '@/pages/TicketsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: TicketsPage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard to check authentication
router.beforeEach((to, _from, next) => {
  const userEmail = localStorage.getItem('userEmail')
  
  if (to.meta.requiresAuth && !userEmail) {
    next('/login')
  } else {
    next()
  }
})

export default router
