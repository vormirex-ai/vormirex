import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingFormData {
  goal: string;
  subjects: string[];
  studyTime: string;
  level: string;
}

interface OnboardingState {
  completed: boolean;
  formData: OnboardingFormData;
}

const initialState: OnboardingState = {
  completed: false,
  formData: {
    goal: "",
    subjects: [],
    studyTime: "",
    level: "",
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.completed = action.payload;
    },

    saveOnboardingData: (state, action: PayloadAction<OnboardingFormData>) => {
      state.formData = action.payload;
    },

    resetOnboarding: () => initialState,
  },
});

export const { setOnboardingCompleted, saveOnboardingData, resetOnboarding } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
