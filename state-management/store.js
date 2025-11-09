import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import searchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    search: searchSlice
  },
});

export default store;
