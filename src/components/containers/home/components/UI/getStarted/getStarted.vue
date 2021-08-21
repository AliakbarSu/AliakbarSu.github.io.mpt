<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="getStarted">
    <v-timeline-item color="purple lighten-2" fill-dot right>
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon dark size="42" class="mr-4"> mdi-face-profile </v-icon>
          <h2 class="text-h4 white--text font-weight-light">
            Create an Account
          </h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              Creating an account allows you to save your tests and view the
              results of the tests you have already taken.
            </v-col>
            <!-- <v-col class="hidden-sm-and-down text-right" md="2">
              <v-icon size="64"> mdi-calendar-text </v-icon>
            </v-col> -->
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="amber lighten-1" fill-dot left small>
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="text-h4 mr-4 white--text font-weight-light">
            Book Your Test
          </h2>
          <v-icon dark size="42">mdi-book</v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              Book whatever test you want to take. At the moment only AMC tests
              are availabel but we are working on bring on more tests.
            </v-col>
            <!-- <v-col cols="12" md="4">
              Lorem ipsum dolor sit amet, no nam oblique veritus.
            </v-col> -->
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="cyan lighten-1" fill-dot right>
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon class="mr-4" dark size="42">mdi-credit-card-check</v-icon>
          <h2 class="text-h4 white--text font-weight-light">
            Make the payment
          </h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              Pay for your test using our secure checkout. We accept all major
              credit cards.
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="red lighten-1" fill-dot left small>
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="text-h4 mr-4 white--text font-weight-light">
            Take the Test
          </h2>
          <v-icon dark size="42"> mdi-account-multiple-outline </v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col class="hidden-sm-and-down" md="2">
              <v-icon size="64"> mdi-server-network </v-icon>
            </v-col>
            <v-col cols="12" md="10">
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
              scaevola imperdiet nec ut, sed euismod convenire principes at. Est
              et nobis iisque percipit, an vim zril disputando voluptatibus.
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="green lighten-1" fill-dot right>
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon class="mr-4" dark size="42"> mdi-phone-in-talk </v-icon>
          <h2 class="text-h4 white--text font-weight-light">
            Recieve the Feedback
          </h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
              scaevola imperdiet nec ut, sed euismod convenire principes at. Est
              et nobis iisque percipit, an vim zril disputando voluptatibus, vix
              an salutandi sententiae.
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {}
</script>

<style scoped>
.getStarted {
  width: 90%;
  margin: 5% auto;
}
</style>
