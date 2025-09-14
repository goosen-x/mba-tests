import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestState, Answer, TestResult } from '@/types';

interface TestStore extends TestState {
  setCurrentQuestion: (index: number) => void;
  addAnswer: (answer: Answer) => void;
  updateAnswer: (questionId: string, value: number | string | string[], score: number) => void;
  resetTest: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  updateProgress: (progress: number) => void;
  result?: TestResult;
  setResult: (result: TestResult) => void;
}

const initialState: TestState = {
  currentQuestionIndex: 0,
  answers: [],
  startedAt: new Date(),
  progress: 0
};

export const useTestStore = create<TestStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCurrentQuestion: (index: number) =>
        set({ currentQuestionIndex: index }),
      
      addAnswer: (answer: Answer) =>
        set((state) => ({
          answers: [...state.answers.filter(a => a.questionId !== answer.questionId), answer]
        })),
      
      updateAnswer: (questionId: string, value: number | string | string[], score: number) =>
        set((state) => ({
          answers: [
            ...state.answers.filter(a => a.questionId !== questionId),
            { questionId, value, score }
          ]
        })),
      
      resetTest: () =>
        set({
          ...initialState,
          startedAt: new Date(),
          result: undefined
        }),
      
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, 11) // 12 вопросов - 1
        })),
      
      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
        })),
      
      updateProgress: (progress: number) =>
        set({ progress }),
      
      setResult: (result: TestResult) =>
        set({ result })
    }),
    {
      name: 'mba-test-storage',
      partialize: (state) => ({
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        startedAt: state.startedAt,
        progress: state.progress,
        result: state.result
      })
    }
  )
);