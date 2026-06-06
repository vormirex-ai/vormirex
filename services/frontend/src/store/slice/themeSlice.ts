import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";
export type FontSize = "small" | "medium" | "large";

interface UiState {
  theme: Theme;
  fontSize: FontSize;
  compactSidebar: boolean;
  reducedAnimations: boolean;
  accentColor: string;
}

const initialState: UiState = {
  theme: (localStorage.getItem("theme") as Theme) || "dark",
  fontSize: "medium",
  compactSidebar: false,
  reducedAnimations: false,
  accentColor: "blue-indigo",
};

const uiSlice = createSlice({
  name: "theme", // Keep it named "theme" for redux-persist compatibility
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      state.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
    },
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
    },
    setCompactSidebar: (state, action: PayloadAction<boolean>) => {
      state.compactSidebar = action.payload;
    },
    setReducedAnimations: (state, action: PayloadAction<boolean>) => {
      state.reducedAnimations = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.accentColor = action.payload;
    },
    setUiPreferences: (state, action: PayloadAction<Partial<UiState>>) => {
      if (action.payload.theme !== undefined) {
        state.theme = action.payload.theme;
        localStorage.setItem("theme", action.payload.theme);
      }
      if (action.payload.fontSize !== undefined) state.fontSize = action.payload.fontSize;
      if (action.payload.compactSidebar !== undefined) state.compactSidebar = action.payload.compactSidebar;
      if (action.payload.reducedAnimations !== undefined) state.reducedAnimations = action.payload.reducedAnimations;
      if (action.payload.accentColor !== undefined) state.accentColor = action.payload.accentColor;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setFontSize,
  setCompactSidebar,
  setReducedAnimations,
  setAccentColor,
  setUiPreferences,
} = uiSlice.actions;

export default uiSlice.reducer;
