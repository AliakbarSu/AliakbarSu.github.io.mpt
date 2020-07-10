import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/containers/dashboard/dashboard.vue'
import Results from '../components/containers/results/results.vue'
import Auth from '../components/containers/auth/auth'
import Checkout from '../components/containers/payment-gateway/paymentGateway.vue'
// import { autoLogin } from "../services/auth"
import { store } from '../store/store'
import firebase from '../../firebase'

async function guardMyroute(to, from, next) {
  store.dispatch("autoLogin")
  if(await firebase.firebase.getCurrentUser()) {
    next()
  }else {
    next("/auth")
  }
}

async function notAuthenticatedOnly(to, from, next) {
  store.dispatch("autoLogin")
  if(await firebase.firebase.getCurrentUser()) {
    console.log("loginout")
    next("/")
  }else {
    next()
  }
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    beforeEnter: guardMyroute,
    component: Dashboard
  },
  {
    path: '/test-results',
    name: 'Results Summary',
    beforeEnter: guardMyroute,
    component: Results
  },
  {
    path: '/auth',
    name: 'Auth',
    beforeEnter: notAuthenticatedOnly,
    component: Auth
  },
  {
    path: '/checkout',
    name: 'Checkout',
    beforeEnter: guardMyroute,
    component: Checkout
  },
  {
    path: '/test',
    name: 'Test',
    beforeEnter: guardMyroute,
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
