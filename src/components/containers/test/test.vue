<template>
  <Alert :alert="alert" @cancel="cancelAlert" @submit="alertSubmit" />
  <v-container fluid>
    <div class="test">
      <ProgressCircular v-if="loading" />
      <Instructions @start="start" :open="!testStarted" />
      <div class="content" v-if="testStarted">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <TimeDisplay :time="timeRemained" />
            <TimeProgressBar :timeElapsed="timeElapsed" />
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <QuestionComponent :question="question" />
            <!-- <CircularTimer/> -->
            <Options @select="select" :options="question.options" />
          </div>
        </div>
        <QuestionControls
          :canSkip="canSkip"
          @next="next"
          @skip="skip"
          @end="endTest"
        />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
// import { questions } from '../../../dummyData'
import Instructions from './components/instructions/instructions.vue'
// import Circle8 from 'vue-loading-spinner/src/components/Circle8'
import ProgressCircular from '@/components/UI/progress-circular/progressCircular.vue'
import TimeProgressBar from './components/UI/time-progress-bar/timeProgressBar.vue'
import QuestionComponent from './components/UI/question/question.vue'
import Options from './components/UI/options/options.vue'
import QuestionControls from './components/UI/question-controls/questionControls.vue'
import TimeDisplay from './components/UI/time-display/time-display.vue'
import { defineComponent } from 'vue'
import Alert, { type AlertType } from './components/UI/alert/alert.vue'

import axios from 'axios'
import type { Test, SubmittedAnswer, Answer } from '@/types/test'
import type { Option, Question } from '@/types/question'

interface TestInProgress extends Omit<Test, 'questions'> {
  questions: QuestionInProgress[]
  start_at: number
  end_at: number
  lastIndex: number
}

export interface QuestionInProgress extends Question {
  number: number
  start_at: number
  submitted: boolean
  skipped: boolean
  isLast: boolean
  isFirst: boolean
}

const dummyTest: Test = {
  id: 'fsjfsj',
  name: 'jfsjf',
  description: "This is the test's description",
  questions: [
    {
      id: 'questionOne',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    },
    {
      id: 'questionTwo',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    },
    {
      id: 'questionThree',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    },
    {
      id: 'questionFour',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    },
    {
      id: 'questionFive',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    },
    {
      id: 'questionSix',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    },
    {
      id: 'questionSeven',
      text: 'This is a good questin',
      options: [
        { id: 'optionOne', text: 'jfksajfajsf', alpha: 'A' },
        { id: 'optionTwo', text: 'jfksajfajsf', alpha: 'B' }
      ],
      correct_option_explanation: "This is the correct option's explanation",
      field: "This is the question's field"
    }
  ],
  thumbnail: []
}

export default defineComponent({
  created() {
    // this.loadTest()
    this.test = {
      ...dummyTest,
      lastIndex: dummyTest.questions.length - 1
    } as TestInProgress
    this.numberQuestions()
  },
  data() {
    return {
      skipping: false,
      test: {} as TestInProgress,
      currentQuestionIndex: undefined as number | undefined,
      submittedAnswers: [] as Answer[],
      selectedOption: {} as Option,
      testEndsIn: 0,
      interval: 0,
      timeLimit: 1.26e7,
      timeRemained: { h: 0, m: 0, s: 0, mil: 0 },
      isTimeOver: false,
      loading: false,
      alert: {
        active: false,
        message: '',
        action: ''
      } as AlertType
    }
  },
  components: {
    Instructions,
    // Circle8,
    ProgressCircular,
    TimeProgressBar,
    QuestionComponent,
    Options,
    QuestionControls,
    TimeDisplay,
    Alert
  },
  methods: {
    async loadTest() {
      const testId = this.$route.params.id
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/tests/${testId}/load`
      )
      this.test = JSON.parse(response.data.body)
    },
    async submit() {
      const payload: SubmittedAnswer = {
        test_id: this.test.id,
        answers: this.submittedAnswers,
        start_at: this.test.start_at,
        end_at: new Date().getTime()
      }
      console.log(payload)
      return
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/tests/${this.test.id}/submit`,
        payload
      )
      this.$router.push(`/results/${this.test.id}`)
    },
    start() {
      this.setTimer()
      const now = new Date().getTime()
      this.test.start_at = now
      this.currentQuestionIndex = 0
      this.sortQuestions()
      this.test.questions = this.test.questions.map((question, index) => {
        return index === this.currentQuestionIndex
          ? {
              ...question,
              start_at: now
            }
          : question
      })
    },
    setTimer() {
      if (this.interval) {
        clearInterval(this.interval)
      }
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
        1.2528e7
        if (t < 0) {
          clearInterval(this.interval)
          this.isTimeOver = true
          // this.$swal
          //   .fire('Time Over', 'Your time is over!', 'error')
          //   .then(() => {
          //     this.calculateResults()
          //   })
        }
      }, 100) as any as number
    },
    cancelAlert() {
      this.alert.active = false
    },
    alertSubmit(action: string) {
      if (action === 'end') {
        this.submit()
      }
    },

    endTest() {
      this.alert = {
        active: true,
        message: "You can't end the test without answering any question",
        action: 'end'
      }
    },
    select(option: Option) {
      this.selectedOption = option
    },
    skip() {
      this.test.questions = this.test.questions.map((question) => {
        return question.id === this.question.id
          ? { ...question, skipped: true }
          : question
      })
      this.skipping = true
      this.nextQuestion()
    },
    next() {
      if (!this.selectedOption.id) {
        this.alert = {
          active: true,
          message: 'Please select an option',
          action: ''
        }
        return
      }
      const submittedAnswers: Answer = {
        question_id: this.question.id,
        option_id: this.selectedOption.id,
        start_at: this.question.start_at,
        end_at: new Date().getTime()
      }
      this.submittedAnswers.push(submittedAnswers)
      this.nextQuestion()
    },
    nextQuestion() {
      this.sortQuestions()
      if (this.question.isLast) {
        console.log(this.submittedAnswers)
        return
      }
      if (this.skipping && this.question.isFirst) {
        this.currentQuestionIndex = 0
        this.skipping = false
      } else {
        this.currentQuestionIndex = (this.currentQuestionIndex || 0) + 1
      }
    },
    numberQuestions() {
      this.test.questions = this.test.questions.map((question, index) => ({
        ...question,
        number: index + 1
      }))
    },
    sortQuestions() {
      const sortedQuestions = this.test.questions.sort((a, b) => {
        if (a.skipped && !b.skipped) {
          return 1
        } else if (!a.skipped && b.skipped) {
          return -1
        } else {
          return a.number - b.number
        }
      })
      this.test.questions = sortedQuestions
      this.indexQuestions()
    },
    indexQuestions() {
      this.test.questions = this.test.questions.map((question, index) => {
        return {
          ...question,
          isLast: index === this.test.questions.length - 1,
          isFirst: index === 0
        }
      })
    }
  },
  computed: {
    canSkip() {
      return !this.question.skipped
    },
    question() {
      return this.test.questions[this.currentQuestionIndex || 0]
    },
    testStarted(): boolean {
      return this.currentQuestionIndex !== undefined
    },
    timeElapsed() {
      return (
        100 - ((this.timeLimit - this.timeRemained.mil) / this.timeLimit) * 100
      )
    }
  }
})
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
