<template>
  <div>
    <v-progress-linear
      v-model="time"
      color="amber"
      height="25"
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
