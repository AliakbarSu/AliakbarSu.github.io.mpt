
<template>
  <v-app app>
    <Alert />
    <Navbar />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
  <!-- <RouterView /> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Footer from '@/components/UI/footer/footer.vue'
import Navbar from '@/components/UI/navbar/navbar.vue'
import Alert from '@/components/UI/alert/alert.vue'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'
export default defineComponent({
  mounted() {
    this.$store.dispatch('retrieveTokenFromAuthz')
  },
  components: {
    Footer,
    Navbar,
    Alert
  },
  setup() {
    // const { loginWithRedirect } = useAuth0()
    // return {
    //   login: () => {
    //     loginWithRedirect()
    //   }
    // }
  },
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
  }
})
</script>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
