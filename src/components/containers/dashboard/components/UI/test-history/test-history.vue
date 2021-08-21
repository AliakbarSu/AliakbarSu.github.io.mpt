<template>
  <div>
    <v-alert v-if="!isAnyHistory" dense type="info" class="mt-3">
      You have not taken any test yet
    </v-alert>
    <v-timeline v-else>
      <v-timeline-item
        v-for="test in history"
        :key="test.results.timestamps"
        color="red lighten-2"
        large
      >
        <template v-slot:opposite>
          <span>{{ test.results.timestamps }}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="text-h5">{{ test.name }}</v-card-title>
          <v-card-text>
            {{ test.description }}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  props: ['history'],
  computed: {
    isAnyHistory() {
      return this.history.length > 0
    }
  }
}
</script>
