<template>
<div class="content">
  <div class="alert" :class="{'alert--red': !passed}">
    <p class="alert__text" v-if="passed">Congratulations you have passed the test</p>
    <p class="alert__text" v-else>Unfortunately! you failed the test</p>
  </div>
  <p>Scores Breakdown</p>
  <div class="results">
    <div class="results__result">
      <p class="result__title result__title--orange">Overall Score</p>
      <span class="result__score">{{overallScore}}</span>
    </div>
    <div class="results__result">
      <p class="result__title result__title--green">Correct Questions</p>
      <span class="result__score">{{correct}}</span>
    </div>
    <div class="results__result">
      <p class="result__title result__title--red">Incorrect Questions</p>
      <span class="result__score">{{incorrect}}</span>
    </div>
  </div>
  <p>Score Graphs</p>
  <div class="sections__wrapper">
    <div class="sections">
      <p class="graph__title">Your Scores Percentage at Different Categories</p>
      <Bar :data="categoriesScores" :options="options"/>
    </div>
    <div class="sections">
      <p class="graph__title">Accuracy Accross Questions</p>
      <!-- <Line-graph :data="accuracyOverTime" :options="options"/> -->
    </div>
  </div>
  <p>Your Timing</p>
  <div class="sections__wrapper">
    <div class="sections">
      <p class="graph__title">Average Time Taken at Each Category</p>
      <Bar :data="averageCategoryTiming" :options="options"/>
    </div>
    <div class="sections">
      <p class="graph__title">Timing Performance Accross Questions</p>
      <Line-graph :data="speedOverTime" :options="options"/>
    </div>
  </div>
  <p>Performance at Each Category</p>
  <div class="sections__wrapper">
    <div class="sections">
      <p class="graph__title">Correct Answers</p>
      <Pie :data="sectionsCorrectScores" :options="options"/>
    </div>
    <div class="sections">
      <p class="graph__title">Incorrect Answers</p>
      <Pie :data="sectionsIncorrectScores" :options="options"/>
    </div>
  </div>
  <div class="actions">
    <button class="actions__buttons">Retake</button>
    <button class="actions__buttons" @click="navigateToDashboard">Go to dashboard</button>
    <button class="actions__buttons">Print results</button>
  </div>
</div>
  
</template>

<script>
import Bar from './components/bar/bar'
import Pie from './components/pie/pie'
import Line from './components/line/line'

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
]

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
]

export default {
  data() {
    return {
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
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
    Bar,
    Pie,
    "Line-graph": Line
  },
  methods: {
    navigateToDashboard() {
      this.$router.push("/dashboard")
    }
  },
  computed: {
    sectionsCorrectScores() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(section => section.section),
        datasets: [{
              label: '# of Votes',
              data: this.$store.getters.getTestResult.categoryBasedScore.map(section => section.correct),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      }
    },
    sectionsIncorrectScores() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(section => section.section),
        datasets: [{
              label: '# of Votes',
              data: this.$store.getters.getTestResult.categoryBasedScore.map(section => section.incorrect),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      }
    },
    averageCategoryTiming() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(section => section.section),
        datasets: [{
              label: 'your average time spent on questions of specific category',
              data: this.$store.getters.getTestResult.categoryBasedScore.map(section => section.averageAnsweringTime),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
          }]
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
        labels: this.$store.getters.getTestResult.accuracy.map(qa => qa.time),
        datasets: [{
              label: 'your accuracy over the course of the test',
              data: this.$store.getters.getTestResult.accuracy.map(qa => qa.count),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 3
          }]
      }
    },
    speedOverTime() {
      return {
        labels: this.$store.getters.getTestResult.speed.map(qa => qa.time + " minutes"),
        datasets: [{
              label: 'time spent on questions at each time interval',
              data: this.$store.getters.getTestResult.speed.map(qa => qa.answeredIn),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      }
    },
    categoriesScores() {
      return {
        labels: this.$store.getters.getTestResult.categoryBasedScore.map(qa => qa.section),
        datasets: [{
              label: 'your total score at each category',
              data: this.$store.getters.getTestResult.categoryBasedScore.map(qa => qa.percentage),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 12px;
  @media(min-width: 1200px) {
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
  background: #efefef;
  border-radius: 5px;
  padding: 12px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    color: #5cbf5c;
    background: white;
  }
}

</style>