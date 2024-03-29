<template>
  <v-container fluid>
    <div class="test">
      <ProgressCircular v-if="loading" />

      <Instructions @start="start" v-if="!hasTestStarted && !loading" />
      <div class="content" v-else>
        <div class="elevation-2 pa-2 py-4 rounded-lg my-7" v-if="!loading">
          <!-- <span>Time Remaining: </span>
          <span
            >{{ timeRemained.h }} : {{ timeRemained.m }} :
            {{ timeRemained.s }}</span
          > -->
          <TimeDisplay :time="timeRemained" />
          <TimeProgressBar :timeElapsed="timeProgress" />
        </div>
        <div class="question" v-if="!loading">
          <Question :question="question" />
          <!-- <CircularTimer/> -->
          <Options @select="selectAnswer" :options="question.options" />
        </div>
        <QuestionControls
          @next="next"
          @skip="skip"
          @end="endTest"
          v-if="!loading"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
// import CircularTimer from '../../UI/circular-timer/circular-timer'
import { questions } from '../../../dummyData'
import Instructions from './components/instructions/instructions.vue'
// import Circle8 from 'vue-loading-spinner/src/components/Circle8'
import ProgressCircular from '../../UI/progress-circular/progressCircular.vue'
import TimeProgressBar from './components/UI/time-progress-bar/timeProgressBar.vue'
import Question from './components/UI/question/question.vue'
import Options from './components/UI/options/options.vue'
import QuestionControls from './components/UI/question-controls/questionControls.vue'
import TimeDisplay from './components/UI/time-display/time-display.vue'

export default {
  data() {
    return {
      questions: [],
      question: {},
      submitted_questions: [],
      skipped_questions: [],
      submitted_answer: {},
      testEndsIn: 0,
      interval: null,
      timeLimit: 1.26e7,
      timeRemained: { h: 0, m: 0, s: 0, mil: 0 },
      isTimeOver: false,
      hasTestStarted: false,
      loading: true,
      testStartTime: 0
    }
  },
  components: {
    Instructions,
    // Circle8,
    ProgressCircular,
    TimeProgressBar,
    Question,
    Options,
    QuestionControls,
    TimeDisplay
  },
  mounted() {
    this.questions = questions
    this.loading = false
    this.questions = this.$store.getters.getCurrentTest.map((q, index) => ({
      ...q,
      number: index + 1
    }))
    this.question = this.questions[0]
  },
  methods: {
    start() {
      this.setTimer()
      const now = new Date().getTime()
      this.testStartTime = now
      this.question = { ...this.questions[0], startAt: now }
    },
    setTimer() {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.hasTestStarted = true
      this.testEndsIn = this.timeLimit + new Date().getTime()
      this.interval = setInterval(() => {
        const now = new Date().getTime()
        const t = this.testEndsIn - now
        this.timeRemained.h = Math.floor(
          (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        this.timeRemained.m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
        this.timeRemained.s = Math.floor((t % (1000 * 60)) / 1000)
        this.timeRemained.mil = t
        //1.2528e+7
        if (t < 0) {
          clearInterval(this.interval)
          this.isTimeOver = true
          this.$swal
            .fire('Time Over', 'Your time is over!', 'error')
            .then(() => {
              this.calculateResults()
            })
        }
      }, 100)
    },
    next() {
      if (!this.submitted_answer.id) {
        return this.$swal.fire(
          'No Option Selected',
          'Please select an option before pressing NEXT!',
          'error'
        )
      }
      this.removeQuestion()
      const now = new Date().getTime()
      this.submitted_questions.push({
        ...this.question,
        submitted_answer: this.submitted_answer,
        endAt: now
      })

      this.resetAnswers()

      if (this.isTestOver) {
        this.calculateResults()
      } else if (this.isLastQuestion) {
        this.applySkippedQuestions()
      }

      this.setNextQuestion()
    },
    removeQuestion() {
      this.questions = this.questions.filter((q) => q.id !== this.question.id)
    },
    setNextQuestion() {
      const now = new Date().getTime()
      const currentIndex = this.questions.findIndex(
        (q) => q.id == this.questions.id
      )
      this.question =
        currentIndex == this.questions.length - 1
          ? this.question
          : { ...this.questions[currentIndex + 1], startAt: now }
    },
    applySkippedQuestions() {
      this.questions = this.skipped_questions
      this.skipped_questions = []
    },
    calculateResults() {
      const dataToSubmit = {
        submitted_answers: this.submitted_questions,
        testStartTime: this.testStartTime,
        testId: this.testId,
        userId: this.$auth.user.sub.split('|')[1]
      }
      this.$store.dispatch('submitTest', dataToSubmit).then(() => {
        this.$router.push('/test-results')
      })
    },
    resetAnswers() {
      this.submitted_answer = {}
      this.showExplanations = false
    },
    skip() {
      this.removeQuestion()
      this.skipped_questions = [
        ...this.skipped_questions.filter((sq) => sq.id !== this.question.id),
        this.question
      ]
      if (this.isLastQuestion) {
        this.applySkippedQuestions()
      }
      this.resetAnswers()
      this.setNextQuestion()
    },
    endTest() {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will not be able to return to this test!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, end test!',
        cancelButtonText: 'No, continue'
      }).then(({ value }) => {
        if (value) {
          this.calculateResults()
        }
      })
    },
    selectAnswer(answer) {
      this.submitted_answer = answer
    },
    isSelected(answer) {
      return this.submitted_answer.id == answer.id
    }
  },
  computed: {
    isTestOver() {
      return (
        (this.questions.length == 0 && this.skipped_questions.length == 0) ||
        this.isTimeOver
      )
    },
    isLastQuestion() {
      return this.questions.length === 0
    },
    timeProgress() {
      return (
        100 - ((this.timeLimit - this.timeRemained.mil) / this.timeLimit) * 100
      )
    },
    testId() {
      return this.$store.getters.getTestId
    }
  }
}
</script>

<style lang="scss" scoped>
.time-container {
  margin: 25px 0;
}

.test {
  // height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
}

.content {
  width: 100%;
}

.content__thumbnail {
  display: flex;
  justify-content: center;
}

.content__img {
  width: auto;
  height: 30vh;
}

.mode__btn-container {
  display: flex;
  justify-content: flex-end;
}

.mode__btn {
  border: none;
  padding: 12px;
  width: 120px;
  background: #8d8df5;
  border: 1px solid #8d8df5;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: white;
    color: #8d8df5;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
}

.question__question {
  margin-top: 20px;
}

.question__answer {
  padding: 5px;
}

.answer__text {
  cursor: pointer;
  padding-left: 8px;
}

.answer__text--correct {
  color: #9adc9a;
}

.answer__text--wrong {
  color: #f36c6c;
}

.fa-dot-circle {
  cursor: pointer;
}

.question__answers {
  border-top: 1px solid #e6e6e6;
  padding: 12px 50px;
  list-style: none;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions__action {
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  background: #70bf70;
  border: 1px solid #70bf70;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background: white;
    color: #70bf70;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  &:active {
    outline: none;
  }
}

.actions__action:after {
  content: '';
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.actions__action:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}

.spinner__container {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  top: 0;
  bottom: 0;
  align-items: center;
  background: #7575759e;
}

.actions--red {
  background: #f36c6c;
  border: 1px solid #f36c6c;
  &:hover {
    color: #f36c6c;
  }
}

.actions--yellow {
  background: #c5c56d;
  border: 1px solid #c5c56d;
  &:hover {
    color: #c5c56d;
  }
}

.question__explanation {
  padding: 12px;
  border-radius: 5px;
  margin-top: 5px;
}

.question__explanation--red {
  background: #ef5e5e;
}

.question__explanation--green {
  background: #60e460;
}
</style>
