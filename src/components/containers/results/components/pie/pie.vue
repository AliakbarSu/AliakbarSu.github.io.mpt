<template>
  <apexchart
    type="pie"
    width="380"
    :options="chartOptions"
    :series="chartData"
  ></apexchart>
</template>

<script>
export default {
  props: ['data', 'labels'],
  computed: {
    chartOptions() {
      return {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: this.labels,
        responsive: [
          // {
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 200
          //     },
          //     legend: {
          //       position: 'bottom'
          //     }
          //   }
          // }
        ]
      }
    },
    chartData() {
      return this.data
    }
  }
}
</script>
