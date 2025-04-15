import { create } from 'zustand'
import { format } from "date-fns"
import { Diaries } from '@/app/types/diary';

interface UserStore {
    selectedDate: string | null;
    setSelectedDate: (date: string) => void;
    diaries: Diaries;
    setDiaries: (newDiaries: Diaries) => void;
    addDiary: (date: string, content: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
    selectedDate: format(new Date(), "yyyy-MM-dd"),
    setSelectedDate: (date) => set({ selectedDate: date }),
    diaries: {},
    setDiaries: (newDiaries) => set({ diaries: newDiaries }),
    addDiary: (date, content) => {
        set((state) => {
            const updatedDiaries = { ...state.diaries, [date]: content };
            return { diaries: updatedDiaries };
        })
    }
}))

export default useUserStore