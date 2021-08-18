<template>
  <div>
    <v-banner icon="$mdiAccount">
      <p>{{ question.number }}</p>
    </v-banner>

    <p v-html="question.title" class="font-weight-regular">fsf</p>
  </div>
</template>

<script>
export default {
  props: ['question']
}
</script>
