import { configureStore } from '@reduxjs/toolkit'
import newsSlice from './newsSlice'
import  tokenSlice from './tokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    news: newsSlice
  },
})