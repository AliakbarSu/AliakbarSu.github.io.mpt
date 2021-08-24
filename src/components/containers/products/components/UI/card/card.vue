<template>
  <v-card max-width="344" class="text-left">
    <v-img :src="productDetails.images[0]" height="200px"></v-img>
    <v-card-text>
      <div>Test Type</div>
      <p class="text-h4 text--primary">
        {{ productDetails.name }}
      </p>
      <p>{{ duration }}</p>
      <div class="text--primary">
        {{ productDetails.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4" @click="takeTest">
        Book Test
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['duration', 'productDetails'],
  methods: {
    takeTest() {
      this.$emit('takeTest')
    }
  }
}
</script>

<style></style>
