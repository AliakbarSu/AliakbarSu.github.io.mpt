<template>
  <div class="time-display-container">
    <span class="font-weight-bold">Time Remaining: </span>
    <span>{{ time.h }}</span
    ><span class="text-caption"> {{ plural(time.h, 'Hour') }} </span>
    <span>{{ time.m }}</span
    ><span class="text-caption"> {{ plural(time.m, 'Minute') }} </span>
    <span>{{ time.s }}</span
    ><span class="text-caption"> {{ plural(time.s, 'Second') }} </span>
  </div>
</template>

<script>
export default {
  props: ['time'],
  methods: {
    plural(time, word) {
      return time > 1 ? word + 's' : word
    }
  }
}
</script>

<style scoped>
.time-display-container {
  padding: 10px 0;
}
</style>
