import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use( CKEditor )
Vue.config.productionTip = false
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
