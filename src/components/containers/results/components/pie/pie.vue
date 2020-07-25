

<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ["data", "options"],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>

<style lang="scss" scoped>

.content {
  padding: 12px;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

</style>