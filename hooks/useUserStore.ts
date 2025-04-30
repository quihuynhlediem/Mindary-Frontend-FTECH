import { create } from 'zustand'
import { format } from "date-fns"
import { Diaries, DiaryImageDto, DiaryImages } from '@/app/types/diary';

// Define the UserStore interface
interface UserStore {
    selectedDate: string | null;
    diaries: Diaries;
    diaryImages: DiaryImages;
    setSelectedDate: (date: string) => void;
    setDiaries: (newDiaries: Diaries) => void;
    setDiaryImages: (newDiaryImages: DiaryImages) => void;
    addDiary: (date: string, content: string) => void;
    addImages: (date: string, images: DiaryImageDto[]) => void;
}

// Create the Zustand store
const useUserStore = create<UserStore>((set) => ({
    selectedDate: format(new Date(), "yyyy-MM-dd"),
    diaries: {},
    diaryImages: {},
    setSelectedDate: (date) => set({ selectedDate: date }),
    setDiaries: (newDiaries) => set({ diaries: newDiaries }),
    setDiaryImages: (newDiaryImages) => set({ diaryImages: newDiaryImages }),
    addDiary: (date, content) =>
        set((state) => ({
            diaries: { ...state.diaries, [date]: content },
        })),
    addImages: (date, images) =>
        set((state) => ({
            diaryImages: { ...state.diaryImages, [date]: images },
        })),
}));

export default useUserStore