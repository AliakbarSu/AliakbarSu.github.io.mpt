export interface MultiChoiceAnswer {
  id: string
  isCorrect: boolean
  description: string
}

export interface Question {
  id: string
  text: string
  description: string
  subject: string
  answers: MultiChoiceAnswer[]
  images: string[]
}
