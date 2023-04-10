import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import VueApexCharts from 'vue-apexcharts'
app.use(VueApexCharts)
app.component('apexchart', VueApexCharts)

import VueSweetalert2 from 'vue-sweetalert2'
app.use(VueSweetalert2)

import vuetify from './plugins/vuetify'
app.use(vuetify)

import auth0 from '@authentication/index'
app.use(auth0)

app.mount('#app')
