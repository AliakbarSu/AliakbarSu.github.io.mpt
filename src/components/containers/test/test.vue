<template>
  <div class="test">
    <div class="content">
      <p v-if="loading">Loading questions...</p>
      <Navigator @start="start" v-if="!hasTestStarted && !loading"/>
      <div v-else>
        <div v-if="question.images && question.images.length" class="content__thumbnail">
          <img :src="question.images[0]" class="content__img">
        </div>
        <div>
          <span>Time Remaining: </span>
          <span>{{timeRemained.h}} : {{timeRemained.m}} : {{timeRemained.s}}</span>
        </div>
        <div class="question">
          <span>Question: {{question.number}}</span>
          <p class="question__question" v-html="question.question"></p>
          <!-- <CircularTimer/> -->
          <ul class="question__answers">
            <li class="question__answer" 
              v-for="choice in question.choices" 
              :key="choice.id">
                <i v-if="!isSelected(choice)" class="far fa-dot-circle"></i>
                <i v-else class="fas fa-dot-circle" :class="{'answer__text--active': isSelected(choice)}"></i>
                <span @click="selectAnswer(choice)" class="answer__text" >{{choice.text}}</span>
              </li>
          </ul>
        </div>
        <div class="actions">
          <button class="actions__action" @click="next">Next</button>
          <button class="actions__action" @click="skip">Skip</button>
          <button class="actions__action" @click="endTest">End test</button>
          <button class="actions__action" @click="start">Start</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CircularTimer from '../../UI/circular-timer/circular-timer'
import { questions } from '../../../dummyData'
import Navigator from './components/navigator/navigator'
import axios from 'axios'

export default {
  data() {
    return {
      questions: [],
      question: {},
      submitted_questions: [],
      skipped_questions: [],
      submitted_answers: [],
      testEndsIn: 0,
      timeLimit: 1.26e+7,
      timeRemained: {h: 0, m: 0, s: 0},
      isTimeOver: false,
      hasTestStarted: false,
      loading: true
    }
  },
  components: {
    Navigator
  },
  created() {
    axios.get(
      'https://us-central1-acm-test-e80ed.cloudfunctions.net/app/test', 
      {headers: { 'Authorization': "Bearer " + this.$store.getters.getAuth.token}}
    ).then(({data}) => {
      this.questions = data.map((q, index) => ({...q, number: index + 1}))
      this.question = this.questions[0]
      this.loading = false
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    this.questions = questions
  },
  methods: {
    start() {
      this.hasTestStarted = true
      this.testEndsIn = this.timeLimit + new Date().getTime()
      var x = setInterval(() => {
        const now = new Date().getTime(); 
        const t = this.testEndsIn - now; 
        this.timeRemained.h = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        this.timeRemained.m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        this.timeRemained.s = Math.floor((t % (1000 * 60)) / 1000); 
        if (t < 0) { 
          clearInterval(x); 
          this.isTestOver = true
        } 
      }, 100)
      const now = new Date().getTime(); 
      this.$store.commit("setTestStartTime", now)
      this.question = {...this.questions[0], startAt: now}
    },
    next() {
      this.removeQuestion()

      const now = new Date().getTime()
      this.submitted_questions.push({
        ...this.question, 
        submitted_answers: this.submitted_answers,
        endAt: now
      })

      this.resetAnswers()


      if(this.isTestOver) {
        this.calculateResults()
      }else if(this.isLastQuestion) {
        this.applySkippedQuestions()
      }

      this.setNextQuestion()
    },
    removeQuestion() {
      this.questions = this.questions.filter(q => q.id !== this.question.id)
    },
    setNextQuestion() {
      const now = new Date().getTime()
      const currentIndex = this.questions.findIndex(q => q.id == this.questions.id)
      this.question = currentIndex == this.questions.length - 1 ? this.question : {...this.questions[currentIndex + 1], startAt: now}
    },
    applySkippedQuestions() {
      this.questions = this.skipped_questions
      this.skipped_questions = []
    },
    calculateResults() {
      this.$router.push('/test-results')
    },
    resetAnswers() {
      this.submitted_answers = []
    },
    skip() {
      this.removeQuestion()
      this.skipped_questions = [...this.skipped_questions.filter(sq => sq.id !== this.question.id), this.question]
      if(this.isLastQuestion) {
        this.applySkippedQuestions()
      }
      this.resetAnswers()
      this.setNextQuestion()
    },
    endTest() {
      alert("Are you sure you want to end the test?")
      this.$store.dispatch("setResults", this.submitted_questions)
      this.calculateResults()
    },
    selectAnswer(answer) {
      const index = this.submitted_answers.find(op => op.id == answer.id)
      if(index) {
        this.submitted_answers = this.submitted_answers.filter(an => an.id !== answer.id)
      }else {
        this.submitted_answers.push(answer)
      }
    },
    isSelected(answer) {
      return this.submitted_answers.find(an => an.id == answer.id)
    }
  },
  computed: {
    isTestOver() {
      return (this.questions.length == 0 && this.skipped_questions.length == 0 )|| this.isTimeOver
    },
    isLastQuestion() {
      return this.questions.length === 0
    }
  }
}
</script>

<style lang="scss" scopped>

.test {
  height: 100vh;
  display: flex;
  align-items: center;
}

.content {
  padding: 12px;
  text-align: left;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

.content__thumbnail {
  display: flex;
  justify-content: center;
}

.content__img {
  width: auto;
  height: 30vh;
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
  &:hover {
    color: grey;
    transition: 0.3s;
  }
}


.answer__text--active {
  color: #9adc9a;
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
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
  }
}

</style>