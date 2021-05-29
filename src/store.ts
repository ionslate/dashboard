import { configureStore } from '@reduxjs/toolkit';
import userSearchReducer from './pages/Users/userSearchSlice';

export const store = configureStore({
  reducer: {
    userSearch: userSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
