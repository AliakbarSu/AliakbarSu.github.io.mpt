<template >
  <v-container
      class="grey lighten-5 mb-6"
    >
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
        <v-col>
          <Card @takeTest="goToCheckout" :duration="40"/>
        </v-col>
        <v-col>
          <Card @takeTest="goToCheckout" :duration="60"/>
        </v-col>
        <v-col>
          <Card @takeTest="goToCheckout" :duration="80"/>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import Card from "../UI/card/card.vue"
export default {
    methods: {
        goToCheckout() {
            this.$router.push("/checkout")
        }
    },
    components: {
        Card
    }
}
</script>