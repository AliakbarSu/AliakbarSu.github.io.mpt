import Vue from 'vue'
import Vuex from 'vuex'
// import { auth } from './auth'
import { user } from './user'
import { test } from './test'
import { admin } from './admin'

import axios from "axios"

Vue.use(Vuex)


export const store = new Vuex.Store({
  modules: {
    // auth: auth,
    user: user,
    test: test,
    admin: admin
  },
  state: {
    token: '',
    status: '',
    redirect: "/",
    currentTest: {},
    products: []
  },
  mutations: {
    setRedirect(state, payload) {
      state.redirect = payload
    },
    authRequest: (state) => {
      state.status = 'loading'
    },
    authSuccess: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    authError: (state) => {
        state.status = 'error'
    },
    authLogout: (state) => {
      state.token = ""
    },
    setTest: (state, test) => {
      state.currentTest = test
    },
    setProducts: (state, products) => {
      state.products = products
    }
  },
  actions: {
    setRedirect({commit}, payload) {
      commit("setRedirect", payload)
    },
    checkAuth: ({commit}) => {
      const token =  localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = token
      commit("authSuccess", token)
    },
    authRequest: ({commit}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit("authRequest")
        console.log(user)
          Promise.resolve({data: {token: "This is the token"}})
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', token) // store the token in localstorage
            axios.defaults.headers.common['Authorization'] = token
            commit("authSuccess", token)
            // you have your token, now log in your user :)
          //   dispatch("userRequest")
            resolve(resp)
          })
        .catch(err => {
          commit("authError", err)
          localStorage.removeItem('token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
    authLogout: ({commit}) => {
        return new Promise((resolve) => {
          commit("authLogout")
          localStorage.removeItem('token') // clear your user's token from localstorage
          resolve()
        })
    },
    bookTest: (testId) => {
      return axios.post("https://ouaircihvg.execute-api.us-east-1.amazonaws.com/dev/pay", {
        testId
      }).then(res => {
        return res.data.body
      }).catch(err => console.log(err))
    },
    fetchProducts: ({commit}) => {
      return axios.get("https://ouaircihvg.execute-api.us-east-1.amazonaws.com/dev/listproducts")
      .then(res => {
        commit("setProducts", JSON.parse(res.data.body))
        return JSON.parse(res.data.body)
      }).catch(err => console.log(err))
    }
  },
  getters: {
    isAuthenticated(state) { return !!state.token },
    authStatus: state => state.status,
    getProducts: state => state.products
  }
})