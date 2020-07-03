import { saveAuthToLocalStorage, clearAuthFromLocalStorage } from '../services/auth'

export const auth = {
    store: () => {
        return {
            token: "",
            expiresIn: "",
            userId: ""
        }
    },
    mutations: {
        setAuth(state, authData) {
            state.token = authData.token
            state.expiresIn = authData.expiresIn
            state.userId = authData.userId
        },
        clearAuth(state) {
            state.token = ""
            state.userId = ""
            state.expiresIn = ""
        }
    },
    actions: {
        setAuth({commit}, authData) {
            const updatedAuthData = saveAuthToLocalStorage(authData.token, authData.userId, authData.expiresIn)
            commit("setAuth", updatedAuthData)
        },
        logout({commit}) {
            commit("clearAuth")
            clearAuthFromLocalStorage()
        }
    },
    getters: {
        getAuth: state => {
            return state
        },
        isAuth: state => {
            const token = state.token
            const expiresIn = state.expiresIn
            const now = new Date().getTime()
            let authenticated = true
        
            if(!token) { authenticated = false }
            if(expiresIn <= now) { authenticated = false }
            return authenticated
        }
    }
}