<template>
  <div class="test">
    <div class="content">
      <Navigator @start="start" v-if="!hasTestStarted"/>
      <div v-else>
        <div class="content__thumbnail">
          <img :src="question.thumbnail" class="content__img">
        </div>
        <div>
          <span>Time Remaining: </span>
          <span>{{timeRemained.h}} : {{timeRemained.m}} : {{timeRemained.s}}</span>
        </div>
        <div class="question">
          <p class="question__explanation" v-html="question.explaination"></p>
          <br>
          <p class="question__question">{{question.question}}</p>
          <span>{{question.id}}</span>
          <!-- <CircularTimer/> -->
          <ul class="question__answers">
            <li class="question__answer" 
              v-for="option in question.options" 
              :key="option.id">
                <i v-if="!isSelected(option)" class="far fa-dot-circle"></i>
                <i v-else class="fas fa-dot-circle" :class="{'answer__text--active': isSelected(option)}"></i>
                <span @click="selectAnswer(option)" class="answer__text" >{{option.text}}</span>
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
      hasTestStarted: false
    }
  },
  components: {
    Navigator
  },
  created() {
    this.questions = questions
    this.question = this.questions[0]
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
    },
    next() {
      this.removeQuestion()

      this.submitted_questions.push({
        ...this.question, 
        submitted_answers: this.submitted_answers
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
      const currentIndex = this.questions.findIndex(q => q.id == this.questions.id)
      this.question = currentIndex == this.questions.length - 1 ? this.question : this.questions[currentIndex + 1]
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

<style lang="scss">

.test {
  height: 100vh;
  display: flex;
  align-items: center;
}

.content {
  padding: 12px;
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