<template>
<v-app app>
 <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Medical Practice Test</v-toolbar-title>
    </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/account">Account</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/dashboard">Dashboard</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/tests">Take New Test</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="login">Log In</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout">Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


  <!-- Sizes your content based upon application components -->
  <v-main>
      <router-view/>
    </v-main>

  <!-- <Footer/> -->
</v-app>

</template>

<script>
// import Footer from "./components/UI/footer/footer.vue"
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
      throw err;
    });
  });
  },
  components: {
    // Footer
  },
  data: () => ({
    drawer: false,
    group: "first"
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
};
</script>
