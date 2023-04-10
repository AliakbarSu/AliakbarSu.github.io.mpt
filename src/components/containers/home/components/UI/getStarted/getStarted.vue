<template>
  <v-container fluid class="pa-0">
    <v-container fluid class="mt-16">
      <v-row justify="center">
        <v-col cols="12 pa-4 mt-16">
          <h3 class="text-h6 text-sm-h4 font-weight-medium text-center">
            Getting Started
          </h3>
        </v-col>
      </v-row>
    </v-container>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="getStarted">
      <v-timeline-item color="purple lighten-2" fill-dot right>
        <v-card>
          <v-card-title class="purple lighten-2">
            <v-icon dark size="40" class="mr-4">
              mdi-account-edit-outline
            </v-icon>
            <h2 class="text-h6 text-sm-h4 white--text font-weight-light">
              Create an Account
            </h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                In order to use our services you will need to create an account
                with us. It is easy and simple head over to sign up page.
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
            <h2 class="text-h5 text-sm-h4 mr-4 white--text font-weight-light">
              Book Your Test
            </h2>
            <v-icon dark size="40">mdi-book</v-icon>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                You can book any test you want to practice as simple as few
                clicks. The questions in the tests are designed to resemble the
                actual examination questions.
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
            <h2 class="text-h6 text-sm-h4 white--text font-weight-light">
              Make the Payment
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
            <h2 class="text-h6 text-sm-h4 mr-4 white--text font-weight-light">
              Set the Test
            </h2>
            <v-icon dark size="40"> mdi-newspaper-variant-outline </v-icon>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                Once you booked your test you can take them anytime you want.
                Your booked tests stay active for up to 30 days.
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="green lighten-1" fill-dot right>
        <v-card>
          <v-card-title class="green lighten-1">
            <v-icon class="mr-4" dark size="40"> mdi-repeat </v-icon>
            <h2 class="text-h6 text-sm-h4 white--text font-weight-light">
              Recieve Feedback
            </h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col>
                You'll receive instant feedback on your test results. The
                feedbacks are auto generated using highly developed algorithms.
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.getStarted {
  width: 90%;
  margin: 5% auto;
}
</style>
