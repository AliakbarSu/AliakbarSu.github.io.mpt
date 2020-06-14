<template>
  <div class="payment">
      <div class="content">
          <Card :amount="amount"/>
      </div>
  </div>
</template>

<script>
import Card from './components/card/card'

export default {
    components: {
        Card
    },
    computed: {
        amount() {
            return 200
        }
    }
}
</script>

<style lang="scss" scopped>

.payment {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
  padding: 12px;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

</style>