<template>
  <div>
    <v-alert dense type="info" v-if="!isAnyHistory" class="mt-3">
      You do not have any booked test
    </v-alert>
    <v-row>
      <v-col
        v-for="product in tests"
        :key="product.id"
        class="d-flex child-flex"
        cols="4"
      >
        <Card
          @takeTest="takeTest(product._id)"
          :duration="40"
          :productDetails="product"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from '../../../test/components/UI/card/card.vue'

export default {
  props: ['tests'],
  components: {
    Card
  },
  methods: {
    takeTest(testId) {
      this.$emit('takeTest', testId)
    }
  },
  computed: {
    isAnyHistory() {
      return this.tests.length > 0
    }
  }
}
</script>
