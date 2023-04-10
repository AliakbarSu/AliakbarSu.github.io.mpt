<script lang="ts">
import { BarChart } from 'vue-chart-3'

export default {
  extends: BarChart,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 12px;
  @media (min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}
</style>
