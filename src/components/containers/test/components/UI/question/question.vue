<template>
  <div class="elevation-2 rounded-lg pa-2">
    <p class="text-caption">Question Number: {{ question.number }}</p>
    <p v-html="question.title" class="font-weight-regular">Loading...</p>
    <v-container class="d-flex flex-wrap justify-space-between">
      <v-hover
        v-for="image in question.media"
        :key="image.url"
        v-slot="{ hover }"
      >
        <v-img
          :class="{
            'mx-1': true,
            'hover-image': hover,
            'mt-2': true,
            'elevation-16': hover,
            'elevation-2': !hover
          }"
          :aspect-ratio="16 / 8"
          @click="showImage(image.url)"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="400"
          max-width="400"
          :src="image.url"
        ></v-img>
      </v-hover>
    </v-container>
    <v-overlay :value="imageOpen" :opacity="0.9">
      <v-img
        class="mt-2"
        lazy-src="https://picsum.photos/id/11/10/6"
        :src="selectedImage"
      ></v-img>
      <v-container class="white">
        <v-btn color="success" @click="hideImage"> Close Image </v-btn>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: ['question'],
  data() {
    return {
      imageOpen: false,
      selectedImage: ''
    }
  },
  methods: {
    showImage(image) {
      this.imageOpen = true
      this.selectedImage = image
    },
    hideImage() {
      this.imageOpen = false
    }
  }
}
</script>

<style scoped>
.hover-image {
  background-color: rgba(#fff, 0.8);
  cursor: pointer;
}
</style>
