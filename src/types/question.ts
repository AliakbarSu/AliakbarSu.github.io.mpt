export interface Choice {
  id: string
  isCorrect: boolean
  text: string
}

export interface Question {
  id: string
  explanation: string
  question: string
  subject: string
  choices: Choice[]
  images: string[]
}
