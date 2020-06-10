import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/containers/dashboard/dashboard.vue'
import Results from '../components/containers/results/results.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/test-results',
    name: 'Results Summary',
    component: Results
  },
  {
    path: '/test',
    name: 'Test',
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
