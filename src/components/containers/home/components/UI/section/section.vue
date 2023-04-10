<template>
  <v-container fluid class="grey lighten-3">
    <v-row>
      <v-col cols="12" md="4" class="text-center pa-4">
        <p class="text-h5 font-weight-medium">Easily Accessible</p>
        <p class="text-display-2 mb-5">
          You can use our services from almost anywhere in the world as long as
          you have access to a device and an internet connection.
        </p>
        <v-icon x-large color="blue">mdi-home</v-icon>
      </v-col>
      <v-col cols="12" md="4" class="text-center pa-4">
        <p class="text-h5 font-weight-medium">Highly Affordable</p>
        <p class="text-display-2">
          We have taken into consideration that most of our users might be at a
          transitioning stage in terms of their career, so we have made our
          prices as afordable as possible.
        </p>
        <v-icon color="green" x-large>mdi-currency-usd-circle-outline</v-icon>
      </v-col>
      <v-col cols="12" md="4" class="text-center pa-4">
        <p class="text-h5 font-weight-medium">Comprehensive Feedback</p>
        <p class="text-display-2 mb-8">
          Our systems are designed to provide you with the most comprehensive
          feedback on how you performed during a test.
        </p>
        <v-icon color="orange" x-large>mdi-gamepad-circle</v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.section {
  width: 95%;
  margin: 5% auto;
  padding: 15px;
}
</style>
