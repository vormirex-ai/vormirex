import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubjectState {
  selectedSubjectId: string | null;
  currentLessonId: string | null;
  nextLessonId: string | null;
  currentChapterId: string | null;
}

const initialState: SubjectState = {
  selectedSubjectId: null,
  currentLessonId: localStorage.getItem("lessonId") || null,
  nextLessonId: null,
  currentChapterId: null,
};

const subjectSlice = createSlice({
  name: "subject",

  initialState,

  reducers: {
    setSelectedSubjectId: (state, action: PayloadAction<string>) => {
      state.selectedSubjectId = action.payload;
    },

    setCurrentLessonId: (state, action: PayloadAction<string>) => {
      state.currentLessonId = action.payload;

      localStorage.setItem("lessonId", action.payload);
    },

    setNextLessonId: (state, action: PayloadAction<string>) => {
      state.nextLessonId = action.payload;
    },
    setCurrentChapterId: (state, action) => {
      state.currentChapterId = action.payload;
    },

    clearLessonId: (state) => {
      state.currentLessonId = null;

      localStorage.removeItem("lessonId");
    },
  },
});

export const {
  setSelectedSubjectId,
  setCurrentLessonId,
  setNextLessonId,
  setCurrentChapterId,
  clearLessonId,
} = subjectSlice.actions;

export default subjectSlice.reducer;
