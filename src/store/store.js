import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth'
import { user } from './user'
import { test } from './test'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth: auth,
    user: user,
    test: test
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {  }
})