import { TestResult, type Test, type TestHistory } from '@/types/test'

export const DummyTests: Test[] = [
  {
    id: 'test1',
    questions: ['question1', 'question2', 'question3'],
    image: ['https://picsum.photos/200'],
    level: 1,
    description: 'This is a description for test 1.'
  },
  {
    id: 'test2',
    questions: ['question4', 'question5', 'question6'],
    image: ['https://picsum.photos/200'],
    level: 2,
    description: 'This is a description for test 2.'
  },
  {
    id: 'test3',
    questions: ['question7', 'question8', 'question9'],
    image: ['https://picsum.photos/200'],
    level: 3,
    description: 'This is a description for test 3.'
  }
]

export const DummyTestHistory: TestHistory[] = [
  {
    id: 'test1',
    questions: ['question1', 'question2', 'question3'],
    image: ['https://picsum.photos/200'],
    level: 1,
    description: 'This is a description for test 1.',
    timestamp: Date.now(),
    result: TestResult.pass
  },
  {
    id: 'test2',
    questions: ['question4', 'question5', 'question6'],
    image: ['https://picsum.photos/200'],
    level: 2,
    description: 'This is a description for test 2.',
    timestamp: Date.now(),
    result: TestResult.fail
  },
  {
    id: 'test3',
    questions: ['question7', 'question8', 'question9'],
    image: ['https://picsum.photos/200'],
    level: 3,
    description: 'This is a description for test 3.',
    timestamp: Date.now(),
    result: TestResult.pass
  }
]
