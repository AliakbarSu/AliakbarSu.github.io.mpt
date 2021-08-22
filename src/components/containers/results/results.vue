<template>
  <v-container class="pt-12">
    <v-alert v-if="passed" outlined type="success" prominent text>
      Congratulations you have passed the test.
    </v-alert>
    <v-alert v-if="!passed" outlined type="warning" prominent border="left">
      We are sorry to let you know that you failed the test. Practice and try
      again later.
    </v-alert>

    <v-container class="mt-5 elevation-1">
      <!-- <p class="text-body1">Score Breakdown</p> -->
      <v-row dense>
        <v-col class="my-1" cols="12" sm="4">
          <v-container class="elevation-1 rounded-sm">
            <v-row dense>
              <v-col cols="12">
                <p class="text-caption mb-0 text-grey lighten-2">
                  Overall Score
                </p>
              </v-col>
              <v-col cols="12">
                <span class="text-h6 text-grey darken-1">{{
                  overallScore
                }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col class="my-1" cols="12" sm="4">
          <v-container class="elevation-1 rounded-sm">
            <v-row dense>
              <v-col cols="12">
                <p class="text-caption mb-0 text-grey lighten-2">
                  Correct Questions
                </p>
              </v-col>
              <v-col cols="12">
                <span class="text-h6 text-grey darken-1">{{ correct }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col class="my-1" cols="12" sm="4">
          <v-container class="elevation-1 rounded-sm">
            <v-row dense>
              <v-col cols="12">
                <p class="text-caption mb-0 text-grey lighten-2">
                  Incorrect Questions
                </p>
              </v-col>
              <v-col cols="12">
                <span class="text-h6 text-grey darken-1">{{ incorrect }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="elevation-1 mt-7 rounded-sm">
      <p>Score Graphs</p>
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-container class="fill-height">
              <v-row class="elevation-2 pa-2 mt-2 rounded-lg fill-height">
                <v-col cols="12" class="d-flex justify-center">
                  <p class="text-caption">
                    Your Scores Percentage at Different Categories
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <Pie
                    :data="categoriesScores.datasets"
                    :labels="categoriesScores.labels"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" sm="6">
            <v-container class="fill-height">
              <v-row class="elevation-2 pa-2 mt-2 rounded-lg fill-height">
                <v-col cols="12" class="d-flex justify-center">
                  <p class="text-caption">Accuracy Accross Questions</p>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <Line-graph
                    :data="accuracyOverTime.datasets"
                    :labels="accuracyOverTime.labels"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-container class="fill-height">
              <v-row class="elevation-2 pa-2 mt-2 rounded-lg fill-height">
                <v-col cols="12" class="d-flex justify-center">
                  <p class="text-caption">
                    Average Time Taken at Each Category
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <Pie
                    :data="averageCategoryTiming.datasets"
                    :labels="averageCategoryTiming.labels"
                    :options="averageCategoryTiming.options"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" sm="6">
            <v-container class="fill-height">
              <v-row class="elevation-2 pa-2 mt-2 rounded-lg fill-height">
                <v-col cols="12" class="d-flex justify-center">
                  <p class="text-caption">
                    Timing Performance Accross Questions
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <Line-graph
                    :data="speedOverTime.datasets"
                    :labels="speedOverTime.labels"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-container class="fill-height">
              <v-row class="elevation-2 pa-2 mt-2 rounded-lg fill-height">
                <v-col cols="12" class="d-flex justify-center">
                  <p class="text-caption">Correct Answers</p>
                </v-col>

                <v-col cols="12" class="d-flex justify-center">
                  <Pie
                    :data="sectionsCorrectScores.datasets"
                    :labels="sectionsCorrectScores.labels"
                    :options="sectionsIncorrectScores.options"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col cols="12" sm="6">
            <v-container class="fill-height">
              <v-row class="elevation-2 pa-2 mt-2 rounded-lg fill-height">
                <v-col cols="12" class="d-flex justify-center">
                  <p class="text-caption">Incorrect Answers</p>
                </v-col>

                <v-col cols="12" class="d-flex justify-center">
                  <Pie
                    :data="sectionsIncorrectScores.datasets"
                    :labels="sectionsIncorrectScores.labels"
                    :options="sectionsIncorrectScores.options"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container class="elevation-2 mt-7 mb-7 rounded-sm">
      <v-btn class="ma-2" color="success" @click="navigateToDashboard"
        >Go to Dashboard
        <v-icon right dark>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn color="blue-grey" @click="printResults" class="ma-2 white--text">
        Print results
        <v-icon right dark> mdi-cloud-print </v-icon>
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
// import Bar from './components/bar/bar'
import Pie from './components/pie/pie'
import Line from './components/line/line'

export default {
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      passed: false
    }
  },
  mounted() {
    // if(!this.$store.getters.getResults.length) {
    //   return this.$router.push("/")
    // }
    // if(this.overallScore >= 250) {
    //   this.passed = true
    //   this.$store.dispatch("updateTestsStatus", "passed")
    //   this.$swal.fire(
    //     'You Passed',
    //     'Congratulations! you passed the test',
    //     'success'
    //   )
    // }else {
    //   this.passed = false
    //   this.$store.dispatch("updateTestsStatus", "failed")
    //   this.$swal.fire(
    //     'You Failed',
    //     'Unfortunately! you failed the test',
    //     'error'
    //   )
    // }
  },
  components: {
    // Bar,
    Pie,
    'Line-graph': Line
  },
  methods: {
    navigateToDashboard() {
      this.$router.push('/dashboard')
    },
    printResults() {
      window.print()
    }
  },
  computed: {
    sectionsCorrectScores() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(
          (section) => section.category
        ),
        datasets: this.$store.getters.getTestResult.categoryBasedScore.map(
          (section) => section.correct
        )
      }
    },
    sectionsIncorrectScores() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(
          (section) => section.category
        ),
        datasets: this.$store.getters.getTestResult.categoryBasedScore.map(
          (section) => section.incorrect
        ),
        options: {
          dataLabels: {
            formatter: function (val, opts) {
              return opts.w.config.series[opts.seriesIndex] + ' Questions'
            }
          }
        }
      }
    },
    averageCategoryTiming() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(
          (section) => section.category
        ),
        datasets: this.$store.getters.getTestResult.categoryBasedScore.map(
          (section) => section.averageAnsweringTime
        ),
        options: {
          dataLabels: {
            formatter: function (val, opts) {
              return opts.w.config.series[opts.seriesIndex] + ' Minutes'
            }
          }
        }
      }
    },
    overallScore() {
      return this.$store.getters.getTestResult.overallScore.score
    },
    correct() {
      return this.$store.getters.getTestResult.overallScore.correct
    },
    incorrect() {
      return this.$store.getters.getTestResult.overallScore.incorrect
    },
    accuracyOverTime() {
      return {
        labels: this.$store.getters.getTestResult.accuracy.map((qa) => qa.time),
        datasets: this.$store.getters.getTestResult.accuracy.map(
          (qa) => qa.count
        )
      }
    },
    speedOverTime() {
      return {
        labels: this.$store.getters.getTestResult.speed.map(
          (qa) => qa.time + ' mins'
        ),
        datasets: this.$store.getters.getTestResult.speed.map(
          (qa) => qa.answeredIn
        )
      }
    },
    categoriesScores() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(
          (qa) => qa.category
        ),
        datasets: this.$store.getters.getTestResult.categoryBasedScore.map(
          (qa) => qa.percentage
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.equal-height {
  height: 100%;
}

.content {
  padding: 12px;
  @media (min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

.alert {
  background: #96e496;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 8px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.alert--red {
  background: #ea6464;
}

.alert__text {
  color: white;
  padding: 7px;
  font-size: 1em;
  margin: 0;
}

.results {
  border: 1px solid #ececec;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.results__result {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.result__title {
  margin-right: 20px;
  padding: 15px;
  border-radius: 5px;
  color: white;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.result__score {
  font-size: 2em;
  font-weight: bold;
}

.result__title--green {
  background: #53ab53;
}

.result__title--red {
  background: #eb6463;
}

.result__title--orange {
  background: #f9ae19;
}

.sections__wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.sections {
  width: 48%;
  // background: #efefef;
  border-radius: 5px;
  padding: 12px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.graph__title {
  width: 100%;
  text-align: center;
}

.actions {
  padding: 12px;
  margin-top: 12px;
}

.actions__buttons {
  padding: 12px;
  margin-right: 20px;
  width: 150px;
  text-align: center;
  background: #5cbf5c;
  border: 1px solid #5cbf5c;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    color: #5cbf5c;
    background: white;
  }
}
</style>
