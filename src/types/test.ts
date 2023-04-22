import type { Question } from './question'

export enum TestResult {
  pass = 'pass',
  fail = 'fail'
}

export interface Test {
  id: string
  name: string
  questions: string[]
  thumbnail: { url: string }[]
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

export enum ResultEnum {
  pass = 'pass',
  fail = 'fail'
}

export interface Stats {
  totalPoints: number
  totalPointsPerField: { [key: string]: number }
  averageTimeTaken: number
  averageTimeTakenPerField: { [key: string]: number }
  correctResponseRatePerField: {
    [key: string]: number
  }
  incorrectResponseRatePerField: {
    [key: string]: number
  }
  correctResponseCountPerField: { [key: string]: number }
  incorrectResponseCountPerField: { [key: string]: number }
  correctResponseRate: number
  incorrectResponseRate: number
  correctResponseCount: number
  incorrectResponseCount: number
  correctAnswersByMinuteInterval: { [key: string]: number }
  speedByMinuteInterval: { [key: string]: number }
}

export interface TestPerformanceResult {
  test_id: string
  stats: Stats
  result: ResultEnum
  timestamp: number
}
