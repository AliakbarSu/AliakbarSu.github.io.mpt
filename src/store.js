import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    results: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setResults(state, results) {
      state.results = results
    }
  },
  actions: {
    setResults({commit}, results) {
      commit("setResults", results)
    }
  },
  getters: {
    getResults: state => {
      return state.results
    },
    processData: (state) => {
      const processedQuestions = state.results.map(question => {
        const correctOptions = question.options.filter(option => option.isCorrect).map(op => op.id)
        const correctSubmittedAnswers = question.submitted_answers.filter(subAn => correctOptions.includes(subAn.id))
        const gotCorrect = correctOptions.length == correctSubmittedAnswers
        const answeredIn = (question.endAt - question.startAt) / 1000 // changes millseconds to seconds
        return {...question, gotCorrect, answeredIn}
      })
      return processedQuestions
    },
    getOverallScore: (state, getters) => {
      const processedQuestions = getters.processData

      const correctQuestions = processedQuestions.filter(q => q.gotCorrect)
      const incorrectQuestions = processedQuestions.filter(q => !q.gotCorrect)
      
      const answeringTimes = processedQuestions.map(proQa => proQa.answeredIn)
      const totalAnsweringTime = answeringTimes.reduce((total, curr) => total + curr)
      const averageAnsweringTime = Math.round(totalAnsweringTime / answeringTimes.length, 2)

      return {
        correct: correctQuestions.length, 
        incorrect: incorrectQuestions.length,
        of: processedQuestions.length,
        averageAnsweringTime
      }
    },
    getSectionsScores: (state, getters) => {
      const processedQuestions = getters.processData
      const sections = processedQuestions.reduce((prev, curr) => {
        if(!prev.map(dta => dta.category).includes(curr.category)) {
          return [...prev, curr]
        }else {
          return [...prev]
        }
      }, []).map(dta => dta.category)


      const scores = sections.map(section => {
        const totalQuestionsInSection = processedQuestions.filter(qa => qa.category == section)
        const gotCorrectInSection = totalQuestionsInSection.filter(qa => qa.gotCorrect)
        const gotIncorrectInSection = totalQuestionsInSection.filter(qa => !qa.gotCorrect)
        const answeringTimes = totalQuestionsInSection.map(proQa => proQa.answeredIn)
        const totalAnsweringTime = answeringTimes.reduce((total, curr) => total + curr)
        const averageAnsweringTime = Math.round(totalAnsweringTime / answeringTimes.length, 2)
        
        return {
          [section]: {
            section,
            averageAnsweringTime,
            correct: gotCorrectInSection.length,
            incorrect: gotIncorrectInSection.length,
            of: totalQuestionsInSection.length
          }
        }
      })
      return scores
    }
  }
})