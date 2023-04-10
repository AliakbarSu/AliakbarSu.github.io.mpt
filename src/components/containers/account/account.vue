<template>
  <v-container fluid class="my-2 fill-height">
    <v-container class="elevation-2 fill-height align-start" fluid>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-card max-height="125" max-width="125" elevation="2">
              <v-img :src="user.avatar" contain class="grey darken-4"></v-img>
            </v-card>
          </v-col>
          <v-col cols="2" class="align-end d-flex">
            <p>{{ user.name }}</p>
          </v-col>
          <v-col cols="12">
            <v-container class="elevation-2 py-7 rounded-lg d-flex flex-wrap">
              <p class="text-body2 mb-0 mr-2">Email:</p>
              <p class="text-body1 mb-0 text-uppercase">{{ user.email }}</p>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  }
})
</script>
