import { createStore } from 'vuex'
// import { auth } from './auth'
// import { user } from './user'
// import { test } from './test'
//import { admin } from './admin'
// import { getInstance } from '../auth/index'
// const authService = getInstance();

const API_URL = 'https://ouaircihvg.execute-api.us-east-1.amazonaws.com/dev'
// import { getInstance } from '@/auth'

import axios from 'axios'
import type { SubmittedAnswer } from '@/types/test'
import { DummyProducts } from '@/dummyData/products'
import { DummyTestHistory } from '@/dummyData/dashboard'

export const store = createStore({
  modules: {
    // auth: auth,
    // user: user,
    // test: test,
    //admin: admin
  },
  state: {
    token: '',
    userId: '',
    status: '',
    redirect: '/',
    currentTest: [],
    testResult: {},
    testHistory: [],
    testId: '',
    products: [],
    user: {
      tests: [],
      email: '',
      name: '',
      avatar: ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserId(state, userId) {
      state.userId = userId
    },
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
      state.token = ''
    },
    setTest: (state, test) => {
      state.currentTest = test
    },
    setProducts: (state, products) => {
      state.products = products
    },
    setUserTests: (state, tests) => {
      state.user.tests = tests
    },
    setCurrentTest: (state, test) => {
      state.currentTest = test
    },
    setTestResult: (state, result) => {
      state.testResult = result
    },
    setUserTestHistory: (state, testHistory) => {
      state.testHistory = testHistory
    },
    setTestId: (state, testId) => {
      state.testId = testId
    },
    setUserData: (state, userData) => {
      state.user.name = userData.name
      state.user.email = userData.email
      state.user.avatar = userData.picture
    }
  },
  actions: {
    setRedirect({ commit }, payload) {
      commit('setRedirect', payload)
    },
    checkAuth: ({ commit }) => {
      const token = localStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = token
      commit('authSuccess', token)
    },
    authRequest: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit('authRequest')
        console.log(user)
        Promise.resolve({ data: { token: 'This is the token' } })
          .then((resp) => {
            const token = resp.data.token
            localStorage.setItem('token', token) // store the token in localstorage
            axios.defaults.headers.common['Authorization'] = token
            commit('authSuccess', token)
            // you have your token, now log in your user :)
            //   dispatch("userRequest")
            resolve(resp)
          })
          .catch((err) => {
            commit('authError', err)
            localStorage.removeItem('token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },
    authLogout: ({ commit }) => {
      return new Promise((resolve) => {
        commit('authLogout')
        localStorage.removeItem('token') // clear your user's token from localstorage
        resolve('')
      })
    },
    retrieveTokenFromAuthz(context) {
      return new Promise((resolve, reject) => {
        // Todo Check this function again
        // const instance = getInstance()
        // instance.$watch('loading', (loading: boolean) => {
        //   if (loading === false && instance.isAuthenticated) {
        //     instance
        //       .getTokenSilently()
        //       .then((authToken: string) => {
        //         context.commit('setToken', authToken)
        //         context.commit('setUserId', instance.user.sub.split('|')[1])
        //         context.commit('setUserData', instance.user)

        //         resolve(authToken)
        //       })
        //       .catch((error: Error) => {
        //         reject(error)
        //       })
        //   }
        // })
      })
    },
    bookTest: (store, data) => {
      return axios
        .post(API_URL + '/pay', data)
        .then((res) => {
          return res.data.body
        })
        .catch((err) => console.log(err))
    },
    fetchProducts: ({ commit }) => {
      // return axios
      //   .get(API_URL + '/listproducts')
      //   .then((res) => {
      //     commit('setProducts', JSON.parse(res.data.body))
      //     return JSON.parse(res.data.body)
      //   })
      //   .catch((err) => console.log(err))
      commit('setProducts', DummyProducts)
    },
    fetchTests: ({ commit }, userId) => {
      // return axios
      //   .post(API_URL + '/user_tests', { userId })
      //   .then((res) => {
      //     commit('setUserTests', JSON.parse(res.data.body))
      //     return JSON.parse(res.data.body)
      //   })
      //   .catch((err) => console.log(err))
      return commit('setUserTests', DummyProducts)
    },
    fetchTestHistory: ({ commit }, userId) => {
      // return axios
      //   .post(API_URL + '/test_history', { userId })
      //   .then((res) => {
      //     commit('setUserTestHistory', JSON.parse(res.data.body))
      //     return JSON.parse(res.data.body)
      //   })
      //   .catch((err) => console.log(err))
      return commit('setUserTestHistory', DummyTestHistory)
    },
    loadTest: ({ commit }, data) => {
      return axios
        .post(API_URL + '/load_test', data)
        .then((res) => {
          commit('setTestId', data.testId)
          commit('setCurrentTest', JSON.parse(res.data.body))
          return JSON.parse(res.data.body)
        })
        .catch((err) => console.log(err))
    },
    submitTest: ({ commit }, data) => {
      const deconstructed_data = data.submitted_answers.map(({id, submitted_answer, startAt, endAt}: SubmittedAnswer) => ({
        questionId: id,
        submitted_answer: submitted_answer.id,
        startAt: startAt,
        endAt: endAt
      }))
      const dataToPost = {
        submitted_answers: deconstructed_data,
        test_start_time: data.testStartTime,
        testId: data.testId,
        userId: data.userId
      }
      return axios
        .post(API_URL + '/get_test_result', dataToPost)
        .then((res) => {
          commit('setTestResult', res.data)
          return res.data
        })
        .catch((err) => console.log(err))
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUserId: (state) => state.userId,
    authStatus: (state) => state.status,
    getProducts: (state) => state.products,
    userTests: (state) => state.user.tests,
    getCurrentTest: (state) => state.currentTest,
    getTestResult: (state) => state.testResult,
    getTestHistory: (state) => state.testHistory,
    getTestId: (state) => state.testId,
    getUser: (state) => state.user
  }
})
