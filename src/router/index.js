import Vue from 'vue'
import VueRouter from 'vue-router'
import Results from '../components/containers/results/results.vue'
import Auth from '../components/containers/auth/auth'
import Checkout from '../components/containers/payment-gateway/paymentGateway.vue'
import Questions from '../components/containers/admin/questions/questions.vue'
import Account from "../components/containers/account/account.vue"
import Home from '../components/containers/home/index.vue'
import SelectTest from '../components/containers/test/components/selectTest/selectTest.vue'
// import { autoLogin } from "../services/auth"
import { store } from '../store/store'
// import firebase from '../../firebase'

// async function guardMyroute(to, from, next) {
//   store.dispatch("autoLogin")
//   if(await firebase.firebase.getCurrentUser()) {
//     next()
//   }else {
//     next("/auth")
//   }
// }

const ifNotAuthenticated = (to, from, next) => {
  store.dispatch('checkAuth')
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  store.dispatch('checkAuth')
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

// async function notAuthenticatedOnly(to, from, next) {
//   store.dispatch("autoLogin")
//   if(await firebase.firebase.getCurrentUser()) {
//     console.log("loginout")
//     next("/")
//   }else {
//     next()
//   }
// }

Vue.use(VueRouter)

  const routes = [
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
    beforeEnter: ifNotAuthenticated,
    component: Results
  },
  {
    path: '/auth',
    name: 'Auth',
    beforeEnter: ifNotAuthenticated,
    component: Auth
  },
  {
    path: '/checkout',
    name: 'Checkout',
    beforeEnter: ifAuthenticated,
    component: Checkout
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Questions
  },
  {
    path: '/tests',
    name: 'Select Test',
    component: SelectTest
  },
  {
    path: '/test',
    name: 'Test',
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/containers/test/test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
