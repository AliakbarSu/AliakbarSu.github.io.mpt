
import firestore from '../../firebase'

export const admin = {
    store: () => {
        return {
            questions: [],
            question: {
                key: "",
                active: false
            },
            keyId: "s"
        }
    },
    mutations: {
        setQuestions(state, payload) {
            return state.questions = payload
        },
        setQuestion(state, payload) {
            state.question = {...payload, choices: [...payload.choices].map(ch => ({...ch}))}
        },
        setKeyId(state, payload) {
            state.keyId = payload
        },
        setQuestionStatus(state, payload) {
            const questionIndex = state.questions.findIndex(q => q.key == payload.key)
            const questionsCopy = [...state.questions] 
            questionsCopy[questionIndex].active = payload.changeTo
            state.questions = questionsCopy
            state.question.active = payload.changeTo
        }
    },
    actions: {
        suspend({commit, rootState}, key) {
            const question = rootState.admin.questions.find(q => q.key == key)
            let changeTo = true
            if(question.active) {
                changeTo = false
            }
            return firestore.db.collection("modifiedQuestions").doc(key).update({
                active: changeTo
            })
            .then(() => {
                commit("setQuestion", rootState.admin.questions.find(q => q.key == key))
                commit("setQuestionStatus", {key, changeTo})
            })
            .catch(console.log)
        },
        async fetchQuestions({commit}) {
            
            return await new Promise((resolve) => {
                firestore.db.collection("modifiedQuestions").get().then((questionsDoc) => {
                    const questionsArray = []
                    questionsDoc.forEach(snapshot => {
                        questionsArray.push({...snapshot.data(), key: snapshot.id})
                    })
                        commit("setQuestions", questionsArray)
                        resolve()
                })
            
            })
            
        }
    },
    getters: {
        getCurrentLocation: (state) => {
            return state.currentLocation
        },
        getQuestions: (state) => {
            return state.questions
        },
        getQuestion: state => {
            console.log(state.keyId)
            return state.question
        }
    }
}