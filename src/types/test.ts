import type { Question } from './question'

export enum TestResult {
  pass = 'pass',
  fail = 'fail'
}

export interface Test {
  id: string
  questions: string[]
  image: string[]
  level: number
  description: string
}

export interface TestHistory extends Test {
  timestamp: number
  result: TestResult
}

export interface SubmittedAnswer {
  id: string
  submitted_answer: {
    id: string
  }
  startAt: string
  endAt: string
}

export interface Result {
  overallScore: {
    score: number
    correct: number
    incorrect: number
  }
  accuracy: {
    time: number
    count: number
  }[]
  speed: {
    time: number
    answeredIn: number
  }[]
  categoryBasedScore: {
    category: string
    percentage: number
    averageAnsweringTime: number
    incorrect: number
    correct: number
  }[]
}
