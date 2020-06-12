import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    results: {}
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
    }
  }
})