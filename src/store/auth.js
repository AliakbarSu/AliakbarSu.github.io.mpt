import firestore from '../../firebase'

export const auth = {
    store: () => {
        return {
            userId: "",
            isAuth: false
        }
    },
    mutations: {
        setAuth(state, data) {
            state.userId = data.userId
            state.isAuth = data.isAuth
        }
    },
    actions: {
        async logout() {
            await firestore.auth.signOut()
        },
        async login(commit, authData) {
            await firestore.auth.signInWithEmailAndPassword(authData.email, authData.password)
        },
        async signup(commit, authData) {
            await firestore.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        },
        async autoLogin({dispatch, commit}) {
            var user = firestore.auth.currentUser
            if (user) {
                commit("setAuth", {userId: user.uid, isAuth: true})
            }
            dispatch("fetchUserData")
        }
    },
    getters: {
        getAuth: state => {
            return state
        },
        isAuth: state => {
            return state.isAuth
        }
    }
}