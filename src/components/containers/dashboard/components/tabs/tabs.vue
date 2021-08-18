<template>
  <v-tabs fixed-tabs background-color="deep-purple" dark>
    <v-tab @click="tabClicked('bookedTests')">Booked Tests</v-tab>
    <v-tab @click="tabClicked('testHistory')">Tests Taken</v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: ['web', 'shopping', 'videos', 'images', 'news'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    tabClicked(clickedItem) {
      this.$emit('tabClicked', clickedItem)
    }
  }
}
</script>

<style></style>
