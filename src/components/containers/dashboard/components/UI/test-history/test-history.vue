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
          <span>{{ displayCorrectDate(test.results.timestamps) }}</span>
        </template>
        <v-hover v-slot="{ hover }">
          <v-card
            class="elevation-2"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-card-title class="text-h5">{{ test.name }}</v-card-title>
            <v-card-text>
              {{ test.description }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['history'],
  computed: {
    isAnyHistory() {
      return this.history.length > 0
    }
  },
  methods: {
    displayCorrectDate(dateToParse) {
      const date = new Date(dateToParse)
      return moment(date).format('Do MMMM YYYY, h:mm a')
    }
  }
}
</script>
<style scoped>
.v-card .on-hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
