<template>
  <v-app app>
    <Navbar />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/UI/footer/footer.vue'
import Navbar from './components/UI/navbar/navbar.vue'
import axios from 'axios'

export default {
  name: 'App',
  created() {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          // this.$store.dispatch('authLogout')
          // you can also redirect to /login if needed !
        }
        throw err
      })
    })
  },
  components: {
    Footer,
    Navbar
  },
  data: () => ({
    drawer: false,
    group: 'first'
  }),
  computed: {
    isAuthenticated() {
      return this.$auth.isAuthenticated
    }
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    },
    login() {
      this.$auth.loginWithRedirect()
    }
  }
}
</script>
