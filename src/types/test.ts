import type { Question } from './question'


export interface SubmittedAnswer {
  id: string;
  submitted_answer: {
    id: string;
  }
  startAt: string;
  endAt: string;
}

export interface Test {
  id: string
  customer_id: string
  bookedTests: Test[]
  category: string
  status: 'failed' | 'pass'
  submitted_questions: Question[]
}

export interface Result {
  overallScore: {
    score: number;
    correct: number;
    incorrect: number;
  }
  accuracy: {
    time: number;
    count: number;
  }[];
  speed: {
    time: number;
    answeredIn: number;
  }[],
  categoryBasedScore: {
    category: string;
    percentage: number;
    averageAnsweringTime: number;
    incorrect: number;
    correct: number;
  }[]
}
