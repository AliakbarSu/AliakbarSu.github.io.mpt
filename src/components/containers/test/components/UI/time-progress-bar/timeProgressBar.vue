<template>
  <v-progress-linear
    class="rounded-sm"
    v-model="timeElapsed"
    :color="barColor"
    height="35"
  ></v-progress-linear>
</template>

<script>
export default {
  props: ['timeElapsed'],
  computed: {
    barColor() {
      if (this.timeElapsed > 50) {
        return 'green'
      } else if (this.timeElapsed > 30) {
        return 'amber'
      } else {
        return 'red'
      }
    }
  }
}
</script>
