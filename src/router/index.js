import Vue from 'vue'
import VueRouter from 'vue-router'
import Results from '../components/containers/results/results.vue'
import Checkout from '../components/containers/checkout/checkout'
// import Questions from '../components/containers/admin/questions/questions.vue'
import Account from '../components/containers/account/account.vue'
import Home from '../components/containers/home/index.vue'
import SelectTest from '../components/containers/test/components/selectTest/selectTest.vue'
import Dashboard from '../components/containers/dashboard/dashboard.vue'
import Confirmation from '../components/containers/confirmation/index.vue'
import { authGuard } from '../auth/authGuard'
// import { store } from '../store/store'

// const ifNotAuthenticated = (to, from, next) => {
//   store.dispatch('checkAuth')
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   store.dispatch('checkAuth')
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/auth')
// }

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    // beforeEnter: ifNotAuthenticated,
    component: Dashboard
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    // beforeEnter: ifNotAuthenticated,
    component: Confirmation
  },
  {
    path: '/',
    name: 'Home',
    // beforeEnter: ifNotAuthenticated,
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    // beforeEnter: ifNotAuthenticated,
    component: Account
  },
  {
    path: '/test-results',
    name: 'Results Summary',
    beforeEnter: authGuard,
    component: Results
  },
  {
    path: '/checkout',
    name: 'Checkout',
    beforeEnter: authGuard,
    component: Checkout
  },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: Questions
  // },
  {
    path: '/tests',
    name: 'Select Test',
    component: SelectTest
  },
  {
    path: '/test',
    name: 'Test',
    beforeEnter: authGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../components/containers/test/test.vue'
      )
  }
]

const router = new VueRouter({
  routes
})

export default router
