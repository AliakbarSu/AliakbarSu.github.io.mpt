<template>
  <v-container>
    <p>This is checkout</p>
    <button @click="payWithNewCard">Continue To Pay</button>
  </v-container>
</template>

<script>
export default {
  methods: {
    payWithNewCard() {
      this.$store
        .dispatch('bookTest', {
          productId: this.$route.params.testId,
          userId: this.$auth.user.sub,
          userEmail: this.$auth.user.email
        })
        .then((url) => {
          if (url) {
            window.location.href = url
          } else {
            alert('Something went wrong try again!')
          }
        })
    }
  }
}
</script>

<style></style>
