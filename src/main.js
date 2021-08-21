import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import vuetify from './plugins/vuetify'

// Import the plugin here
import { Auth0Plugin } from './auth'
import { domain, clientId } from '../auth_config.json'

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(CKEditor)
Vue.config.productionTip = false
Vue.use(VueSweetalert2)

new Vue({
  router,
  render: (h) => h(App),
  vuetify,
  store
}).$mount('#app')
