import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// import Results from '@components/containers/results/results.vue'
// import Checkout from '@components/containers/checkout/checkout.vue'
// import Questions from '../components/containers/admin/questions/questions.vue'
// import Account from '@components/containers/account/account.vue'
import Home from '@/components/containers/home/index.vue'
import Products from '@/components/containers/products/products.vue'
// import Dashboard from '@components/containers/dashboard/dashboard.vue'
import Confirmation from '@/components/containers/confirmation/index.vue'
import Unsuccessful from '@/components/containers/unsuccessful/unsuccessful.vue'
// import { authGuard } from '@auth/authGuard'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   beforeEnter: authGuard,
  //   component: Dashboard
  // },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/unsuccessful',
    name: 'Unsuccessful',
    component: Unsuccessful
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/account',
  //   name: 'Account',
  //   beforeEnter: authGuard,
  //   component: Account
  // },
  // {
  //   path: '/test-results',
  //   name: 'Results Summary',
  //   beforeEnter: authGuard,
  //   component: Results
  // },
  // {
  //   path: '/checkout',
  //   name: 'Checkout',
  //   beforeEnter: authGuard,
  //   component: Checkout
  // },
  // Todo: from before
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: Questions
  // },
  {
    path: '/tests',
    name: 'Products',
    // beforeEnter: authGuard,
    component: Products
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   // beforeEnter: authGuard,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(
  //   //     /* webpackChunkName: "about" */ '../components/containers/test/test.vue'
  //   //   )
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
