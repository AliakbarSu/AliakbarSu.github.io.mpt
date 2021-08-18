<template>
  <div>
    <p class="text-caption">Question Number: {{ question.number }}</p>
    <p v-html="question.title" class="font-weight-regular">fsf</p>
  </div>
</template>

<script>
export default {
  props: ['question']
}
</script>
