import type { Question } from './question'
import type { Test } from './Test'

export interface User {
  id: string
  customer_id: string
  bookedTests: Test[]
  category: string
  status: 'failed' | 'pass'
  submitted_questions: Question[]
}
