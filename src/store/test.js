const convertTimeToMinutes = (time) => {
    const timeElapsed = time / 60000
    return Math.round((timeElapsed + Number.EPSILON) * Math.pow(10, 2)) / Math.pow(10, 2)
}


export const test = {
    state: () => {
        return {
            results: [],
            testStartedAt: 0
        }
    },
    mutations: {
        setResults(state, results) {
            state.results = results
        },
        setTestStartTime(state, startTime) {
            state.testStartedAt = startTime
        }
    },
    actions: {
        setResults({commit}, results) {
            commit("setResults", results)
        }
    },
    getters: {
        getResults: state => {
            return state.results
        },
        processData: (state) => {
            const processedQuestions = state.results.map(question => {
                const correctOptions = question.choices.filter(choice => choice.isCorrect).map(op => op.id)
                const correctSubmittedAnswers = question.submitted_answers.filter(subAn => correctOptions.includes(subAn.id))
                const gotCorrect = correctOptions.length == correctSubmittedAnswers.length
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
            const totalAnsweringTime = answeringTimes.reduce((total, curr) => total + curr)
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
                const totalSectionScores = gotCorrectInSection.map(qa => qa.point).reduce((total, curr) => total + curr, 0)
                
                return {
                    section,
                    averageAnsweringTime,
                    correct: gotCorrectInSection.length,
                    incorrect: gotIncorrectInSection.length,
                    of: totalQuestionsInSection.length,
                    score: totalSectionScores
                }
            })
            return scores
        },
        getAccuracyOverTime: (state, getters) => {
            const processedQuestions = getters.processData
            const questionsWithTime = processedQuestions.map(pq => ({correct: pq.gotCorrect, time: pq.startAt}))
            const startTime = questionsWithTime[0].time
            const endTime = questionsWithTime[questionsWithTime.length - 1].time
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