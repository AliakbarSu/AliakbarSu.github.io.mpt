<template>
  <div class="mt-16">
    <h4 class="py-4 py-sm-16 text-sm-h3 text-h4 px-4 font-weight-bold">
      What People Say About Us
    </h4>
    <v-carousel
      class="mt-13"
      cycle
      height="400"
      hide-delimiter-background
      :show-arrows="false"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="#0000000a" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="pa-6">
              <div class="text-sm-h4 text-h5 font-italic text-center">
                <v-icon color="#bc62f7">mdi-format-quote-open</v-icon>
                {{ slide.testimony }}
                <v-icon color="#bc62f7">mdi-format-quote-close</v-icon>
              </div>
              <p class="text-h6 text-sm-h5 text-center mt-4">
                {{ slide.name }}
              </p>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          name: 'Zaher Sadaat',
          testimony:
            'Thanks to MLE Prep Tests. It helped me to pass my test on the first try!'
        },
        {
          name: 'Akil Hassan',
          testimony:
            'I highly recommend taking practice tests for anyone preparing for their medical examination'
        }
      ]
    }
  }
}
</script>

<style></style>
