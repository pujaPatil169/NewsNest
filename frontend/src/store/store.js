import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import newsReducer from './newsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});

export default store;
