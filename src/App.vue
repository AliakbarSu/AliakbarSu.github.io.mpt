<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
import firebase from '../firebase'
export default {
  created() {
    this.$store.dispatch("autoLogin")
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("setAuth", {userId: user.uid, isAuth: true})
        this.$store.dispatch("fetchUserData")
      } else {
        this.$store.commit("setAuth", {userId: "", isAuth: false})
      }
    })
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
