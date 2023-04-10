<template>
  <v-container class="ma-0 py-16 hero d-flex align-center" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10"
        ><h1 class="text-sm-h3 text-h2 text-center font-weight-bold">
          Medical Licensing Exam Prep Tests
        </h1>
      </v-col>
      <v-col cols="8"
        ><p class="text-h6 text-sm-h5 text-center font-weight-medium">
          We'll help you to pass your medical licensing exam by providing you
          feedback on practice tests
        </p>
      </v-col>

      <v-col cols="10" class="text-center mt-7">
        <v-btn x-large color="success" @click="bookTest" dark>
          View Tests
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    bookTest() {
      this.$router.push('/tests')
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 80vh;
  background-size: cover;
}
</style>
