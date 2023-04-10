import firestore from '../../firebase'
// import firebase from 'firebase'


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
          const testsHistoryDoc = await firestore.db.collection("users").doc(userId).get()
          const userTestsData = testsHistoryDoc.data()
          
          const now = new Date().getTime()
          const testsHistory = [...userTestsData.testsHistory]
          testsHistory.push({
            date: now,
            submitted_questions: rootState.test.results,
            category: "General",
            status: result
          })

          userTestsData.totalTests++

          if(result == "passed") {
            userTestsData.passedTests++
            commit("increasePassedTests")
          }else {
            userTestsData.failedTests++
            commit("increaseFailedTests")
          }
           
          const data = {
            failedTests: userTestsData.failedTests,
            passedTests: userTestsData.passedTests,
            totalTests: userTestsData.totalTests,
            testsHistory: testsHistory
          }
          await firestore.db.collection("users").doc(userId).update({...data}).catch(err => {
            console.log(err)
          })
          commit("increaseTotalTests")
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