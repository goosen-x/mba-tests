import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MBATestState, SwipeResult, MBATestResult } from '@/types';
import { mbaQuestions } from './mba-questions';

interface MBAStore extends MBATestState {
  addSwipe: (swipe: SwipeResult) => void;
  nextCard: () => void;
  resetTest: () => void;
  completeTest: () => void;
  result?: MBATestResult;
  setResult: (result: MBATestResult) => void;
  getProgress: () => number;
}

const initialState: MBATestState = {
  currentCardIndex: 0,
  swipes: [],
  startedAt: new Date(),
  isCompleted: false
};

export const useMBAStore = create<MBAStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      addSwipe: (swipe: SwipeResult) =>
        set((state) => ({
          swipes: [...state.swipes, swipe]
        })),
      
      nextCard: () =>
        set((state) => ({
          currentCardIndex: state.currentCardIndex + 1
        })),
      
      resetTest: () =>
        set({
          ...initialState,
          startedAt: new Date(),
          result: undefined
        }),
      
      completeTest: () =>
        set({ isCompleted: true }),
      
      setResult: (result: MBATestResult) =>
        set({ result }),
      
      getProgress: () => {
        const state = get();
        return Math.round((state.swipes.length / mbaQuestions.length) * 100);
      }
    }),
    {
      name: 'mba-finder-storage',
      partialize: (state) => ({
        currentCardIndex: state.currentCardIndex,
        swipes: state.swipes,
        startedAt: state.startedAt,
        isCompleted: state.isCompleted,
        result: state.result
      })
    }
  )
);