import axios from "axios"

export const auth = {
    store: () => {
        return {
            token: localStorage.getItem("token") | "",
            status: ""
        }
    },
    mutations: {
        authRequest: (state) => {
            state.status = 'loading'
        },
        authSuccess: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        authError: (state) => {
            state.status = 'error'
        }
    },
    actions: {
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
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status
    }
}