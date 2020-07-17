<template>
  <div id="app">
    <keep-alive include="/admin">
      <router-view/>
    </keep-alive>
  </div>
</template>


<script>
import firebase from '../firebase'
export default {
  created() {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("setAuth", {userId: user.uid, isAuth: true})
        this.$store.dispatch("fetchUserData")
        // this.$router.push(this.$store.state.redirect)
      } else {
        this.$store.commit("setAuth", {userId: "", isAuth: false})
        // this.$router.push("/auth")
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
