<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center wide">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0"
        >Email: info@mle-prep-tests.org</v-card-text
      >

      <v-divider></v-divider>

      <v-card-text class="white--text">
        Copyright © {{ new Date().getFullYear() }}, MLE Prep Tests. All Rights
        Reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: []
  })
}
</script>

<style scoped>
.wide {
  width: 100%;
}
</style>
