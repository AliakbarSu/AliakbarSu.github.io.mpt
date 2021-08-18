<template>
  <div>
    <v-progress-linear
      v-model="timeElapsed"
      :color="barColor"
      height="35"
    ></v-progress-linear>
  </div>
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
