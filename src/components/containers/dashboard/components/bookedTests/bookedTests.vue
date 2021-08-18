<template>
  <v-row>
    <v-col
       v-for="product in tests" :key="product.id"
      class="d-flex child-flex"
      cols="4"
    >

    <Card @takeTest="takeTest(product.id)" :duration="40" :productDetails="product" />

    </v-col>
  </v-row>
</template>


<script>

import Card from "../../../test/components/UI/card/card.vue"

export default {
    props: ['tests'],
    components: {
        Card
    },
    methods: {
        takeTest(testId) {
            this.$emit('takeTest', testId)
        }
    }
}
</script>
