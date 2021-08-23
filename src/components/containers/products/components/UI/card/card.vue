<template>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Test Type</div>
      <p class="text-h4 text--primary">
        {{productDetails.name}}
      </p>
      <p>{{duration}} Minutes</p>
      <div class="text--primary">
        {{productDetails.description}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="takeTest"
      >
        Take The Test
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: ["duration", "productDetails"],
    methods: {
        takeTest() {
            this.$emit("takeTest")
        }
    }
}
</script>

<style>

</style>