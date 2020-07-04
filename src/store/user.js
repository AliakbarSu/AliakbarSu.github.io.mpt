import firestore from '../../firebase'
import firebase from 'firebase'


export const user = {
    state: () => {
        return {
            email: "",
            customerId: "",
            totalTests: 0,
            testsHistory: [],
            passedTests: 0,
            failedTests: 0
        }
    },
    mutations: {
        setUserData(state, data) {
            state.email = data.email,
            state.customerId = data.customerId,
            state.totalTests = data.totalTests,
            state.testsHistory = data.testsHistory,
            state.passedTests = data.passedTests,
            state.failedTests = data.failedTests
        },
        increaseTotalTests(state) {
            state.totalTests++
        },
        increasePassedTests(state) {
            state.passedTests++
        },
        increaseFailedTests(state) {
            state.failedTests++
        }
    },
    actions: {
        fetchUserData: async ({commit, rootState}) => {
          const userId = rootState.auth.userId
          if(userId) {
            const data = await firestore.db.collection("users").doc(userId).get()
            if(data.exists) {
              const userData = data.data()
              commit("setUserData", userData)
            }  
          }
        },
        updateTestsStatus: async ({commit, rootState}, result) => {
            const userId = rootState.auth.userId
            const now = new Date().getTime()
            await firestore.db.collection("users").doc(userId).update({
              totalTests: firebase.firestore.FieldValue.increment(1),
              testsHistory: firebase.firestore.FieldValue.arrayUnion({
                date: now,
                submitted_questions: rootState.results,
                category: "General",
                status: result
              })
            });
            commit("increaseTotalTests")
            if(result == "passed") {
              await firestore.db.collection("users").doc(userId).update({
                passedTests: firebase.firestore.FieldValue.increment(1)
              });
              commit("increasePassedTests")
            }else {
              await firestore.db.collection("users").doc(userId).update({
                failedTests: firebase.firestore.FieldValue.increment(1)
              });
              commit("increaseFailedTests")
            }
            
        }
    },
    getters: {
      getUserTestData: (state) => {
        return state
      },
      hasCardOnFile: (state) => {
        return !!state.customerId
      }
    }
}