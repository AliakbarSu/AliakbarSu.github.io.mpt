<template>
  <v-container class="grey lighten-5 mb-6">
    <v-row>
      <v-col>
        <h1>This is the test page</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>You can select from one of the following test types to proceed</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in products" :key="product.id">
        <Card
          @takeTest="goToCheckout(product.id)"
          :duration="40"
          :productDetails="product"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from './components/UI/card/card.vue'
export default {
  methods: {
    goToCheckout(testId) {
      this.$store
        .dispatch('bookTest', {
          productId: testId,
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
  },
  components: {
    Card
  },
  computed: {
    products() {
      return this.$store.getters.getProducts
    }
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
}
</script>
