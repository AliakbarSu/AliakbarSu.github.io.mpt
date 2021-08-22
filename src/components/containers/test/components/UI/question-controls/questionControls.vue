<template>
  <div class="controls my-8">
    <v-btn class="ml-3" @click="next" depressed color="primary"> Next </v-btn>
    <v-btn class="ml-3" @click="skip" depressed color="warning"> Skip </v-btn>
    <v-btn class="ml-3" @click="end" depressed color="error"> End </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$emit('next')
    },
    skip() {
      this.$emit('skip')
    },
    end() {
      this.$emit('end')
    }
  }
}
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: flex-end;
}
</style>
