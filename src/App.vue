<template>
  <v-app app>
    <!-- <Alert /> -->
    <Navbar />
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>
<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/UI/footer/footer.vue'
import Navbar from '@/components/UI/navbar/navbar.vue'
// import Alert from '@/components/UI/alert/alert.vue'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'
import { DummyUser } from './dummyData/user'
export default {
  data() {
    return {
      isAuth: this.$auth0.isAuthenticated
    }
  },
  watch: {
    isAuth() {
      if (this.isAuth) {
        const userData = this.$auth0.user as unknown as {
          nickname: string
          email: string
          picture: string
        }
        this.$store.commit('setUserData', {
          name: DummyUser.name,
          email: DummyUser.email,
          picture: DummyUser.picture
        })
      }
    }
  },
  components: {
    Footer,
    Navbar
    // Alert
  },
  async created() {
    try {
      const token = await this.$auth0.getAccessTokenSilently()
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
      })
    } catch (err) {}

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
  }
}
</script>
