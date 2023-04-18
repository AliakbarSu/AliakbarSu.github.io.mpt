import type { Result } from "@/types/test";


export const DummyTestResults: Result = {
    overallScore: {
        score: 2,
        correct: 10,
        incorrect: 7
    },
    accuracy: [
        {
            time: 0.5,
            count: 1
        },
        {
            time: 0.6,
            count: 2
        }
    ],
    speed: [
        {
            time: 0.8,
            answeredIn: 0.1
        }
    ],
    categoryBasedScore: [{
            percentage: 10,
            category: "Category 1",
            averageAnsweringTime: 1,
            incorrect: 3,
            correct: 5
        
    }, {
        percentage: 11,
        category: "Category 2",
        averageAnsweringTime: 3,
        incorrect: 2,
        correct: 4
    
}]
}