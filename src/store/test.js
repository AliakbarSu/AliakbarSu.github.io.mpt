const convertTimeToMinutes = (time) => {
    const timeElapsed = time / 60000
    return Math.round((timeElapsed + Number.EPSILON) * Math.pow(10, 2)) / Math.pow(10, 2)
}


export const test = {
    state: () => {
        return {
            results: [],
            testStartedAt: 0,
            subjects: []
        }
    },
    mutations: {
        setResults(state, results) {
            state.results = results
        },
        setTestStartTime(state, startTime) {
            state.testStartedAt = startTime
        },
        setSubjectsPoints(state, questions) {
            const subjectsArray = questions.map(q => q.subject)
            let subjects = []
            subjectsArray.forEach(sub => {
                if(!subjects.includes(sub)) {
                    subjects.push(sub)
                }
            })
            const questionsArray = subjects.map(sub => questions.filter(q => q.subject == sub))
            const subjectsPoints = questionsArray.map(qArray => {
                return {
                    points: qArray.reduce((total, curr) => total + curr.point, 0),
                    subject: qArray[0].subject
                }
            })
            state.subjects = subjectsPoints
        }
    },
    actions: {
        setResults({commit, dispatch}, results) {
            commit("setResults", results)
            dispatch("updateTestsStatus")
        },
        payForTest() {
            return Promise.resolve("paid successfully!")
        }
    },
    getters: {
        getResults: state => {
            return state.results
        },
        processData: (state) => {
            const processedQuestions = state.results.map(question => {
                const correctOptions = question.choices.filter(choice => choice.isCorrect).map(op => op.id)
                const gotCorrect =correctOptions.includes(question.submitted_answer.id)
                const answeredIn = (question.endAt - question.startAt) / 1000 // changes millseconds to seconds
                return {...question, gotCorrect, answeredIn}
            })
            return processedQuestions
        },
        getOverallScore: (state, getters) => {
            const processedQuestions = getters.processData
        
            const correctQuestions = processedQuestions.filter(q => q.gotCorrect)
            const incorrectQuestions = processedQuestions.filter(q => !q.gotCorrect)
            
            const answeringTimes = processedQuestions.map(proQa => proQa.answeredIn)
            const totalAnsweringTime = answeringTimes.reduce((total, curr) => total + curr, 0)
            const averageAnsweringTime = Math.round(totalAnsweringTime / answeringTimes.length, 2)
            const score = correctQuestions.map(qa => qa.point).reduce((total, curr) => total + curr, 0)
        
            return {
                correct: correctQuestions.length, 
                incorrect: incorrectQuestions.length,
                of: processedQuestions.length,
                averageAnsweringTime,
                score: score
            }
        },
        getCategoriesResults: (state, getters) => {
            const processedQuestions = getters.processData
            const sections = processedQuestions.reduce((prev, curr) => {
                if(!prev.map(dta => dta.subject).includes(curr.subject)) {
                return [...prev, curr]
                }else {
                return [...prev]
                }
            }, []).map(dta => dta.subject)
        
            const scores = sections.map(section => {
                const totalQuestionsInSection = processedQuestions.filter(qa => qa.subject == section)
                const gotCorrectInSection = totalQuestionsInSection.filter(qa => qa.gotCorrect)
                const gotIncorrectInSection = totalQuestionsInSection.filter(qa => !qa.gotCorrect)
                const answeringTimes = totalQuestionsInSection.map(proQa => proQa.answeredIn)
                const totalAnsweringTime = answeringTimes.reduce((total, curr) => total + curr)
                const averageAnsweringTime = Math.round(totalAnsweringTime / answeringTimes.length)
                const totalSectionPotentialScore = state.subjects.filter(sub => sub.subject == section).reduce((total, curr) => total + curr.points, 0)
                const totalSectionScores = gotCorrectInSection.map(qa => qa.point).reduce((total, curr) => total + curr, 0)
                
                return {
                    section,
                    averageAnsweringTime,
                    correct: gotCorrectInSection.length,
                    incorrect: gotIncorrectInSection.length,
                    of: totalQuestionsInSection.length,
                    score: totalSectionScores,
                    scorePercentage: (totalSectionScores / totalSectionPotentialScore) * 100
                }
            })
            return scores
        },
        getAccuracyOverTime: (state, getters) => {
            const processedQuestions = getters.processData
            const questionsWithTime = processedQuestions.map(pq => ({correct: pq.gotCorrect, time: pq.startAt}))
            const startTime = questionsWithTime[0] ? questionsWithTime[0].time : 0
            const endTime = questionsWithTime.length ? questionsWithTime[questionsWithTime.length - 1].time : 1
            const range = endTime - startTime
            const interval = range / 10;
            const times = []
            for(let t = startTime; t <= endTime; t+= interval) {
                times.push({time: t})
            }
            const data = times.map(({time}) => {
                const qa = questionsWithTime.filter(q => (q.time <= time) && (q.time >= time - interval))
                const total = qa.map(q => q.correct).reduce((total, curr) => curr ? total + 1 : total, 0);
                const timeElapsedInMinutes = convertTimeToMinutes(time - state.testStartedAt)
                return {time: timeElapsedInMinutes, count: total}
            })
            return data
        },
        getSpeedOverTime: (state, getters) => {
            const processedQuestions = getters.processData
            return processedQuestions.map(pq => ({answeredIn: pq.answeredIn, time: convertTimeToMinutes(pq.startAt - state.testStartedAt)}))
        }
    }
}