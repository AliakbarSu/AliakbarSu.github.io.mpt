<template>
  <div>
    <v-progress-linear
      v-model="time"
      color="amber"
      height="35"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  data: () => ({
    time: 78
  })
}
</script>
