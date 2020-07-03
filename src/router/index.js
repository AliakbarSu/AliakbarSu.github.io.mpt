import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/containers/dashboard/dashboard.vue'
import Results from '../components/containers/results/results.vue'
import Auth from '../components/containers/auth/auth'
import Checkout from '../components/containers/payment-gateway/paymentGateway.vue'
import { autoLogin } from "../services/auth"
import { store } from '../store/store'

function guardMyroute(to, from, next) {
  const isAuth = autoLogin()
  if(isAuth) {
    store.dispatch("setAuth", isAuth)
    next()
  }else {
    store.dispatch("logout")
    next("/auth")
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
