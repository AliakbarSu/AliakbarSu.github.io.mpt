

<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ["data", "options"],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>

<style lang="scss" scopped>

.content {
  padding: 12px;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

</style>