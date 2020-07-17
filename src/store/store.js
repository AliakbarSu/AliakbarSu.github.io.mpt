import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth'
import { user } from './user'
import { test } from './test'
import { admin } from './admin'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth: auth,
    user: user,
    test: test,
    admin: admin
  },
  state: {
    redirect: "/"
  },
  mutations: {
    setRedirect(state, payload) {
      state.redirect = payload
    }
  },
  actions: {
    setRedirect({commit}, payload) {
      commit("setRedirect", payload)
    }
  }
})