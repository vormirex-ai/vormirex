import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubjectState {
  selectedSubjectId: string | null;
}

const initialState: SubjectState = {
  selectedSubjectId: null,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setSelectedSubjectId: (state, action: PayloadAction<string>) => {
      state.selectedSubjectId = action.payload;
    },
  },
});

export const { setSelectedSubjectId } = subjectSlice.actions;
export default subjectSlice.reducer;
