import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/containers/dashboard/dashboard.vue'
import Results from '../components/containers/results/results.vue'
import Auth from '../components/containers/auth/auth'

function guardMyroute(to, from, next) {
  const token = localStorage.getItem("token")
  const expiresIn = localStorage.getItem("expiration")
  const now = new Date().getTime()
  let authenticated = true

  if(!token) { authenticated = false }
  if(expiresIn <= now) { authenticated = false }

  authenticated ? next() : next("/auth")
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
