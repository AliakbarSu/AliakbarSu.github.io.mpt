import type { Question } from './question'

export interface Test {
  id: string
  customer_id: string
  bookedTests: Test[]
  category: string
  status: 'failed' | 'pass'
  submitted_questions: Question[]
}
