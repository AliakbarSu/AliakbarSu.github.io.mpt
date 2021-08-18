<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Medical Practice Test</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/')"
                >Home</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/account')"
                >Account</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/dashboard')"
                >Dashboard</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-test-tube</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/tests')"
                >Take New Test</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="!isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="login">Log In</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout">Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
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
    },
    goTo(link) {
      this.$router.push(link)
    }
  }
}
</script>
