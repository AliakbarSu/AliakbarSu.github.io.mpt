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

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/account">Account</router-link></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


  <!-- Sizes your content based upon application components -->
  <v-main>
      <router-view/>
    </v-main>

  <Footer/>
</v-app>

</template>

<script>
import Footer from "./components/UI/footer/footer.vue"

export default {
  name: 'App',
  components: {
    Footer
  },
  data: () => ({
    drawer: false,
    group: "first"
  }),
};
</script>
