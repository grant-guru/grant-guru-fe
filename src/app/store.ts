import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import savedReducer from '../slices/savedSlice';
import userReducer from '../slices/userSlice';
import scholarshipsReducer from '../slices/scholarshipsSlice';

export const store = configureStore({
  reducer: {
    saved: savedReducer,
    user: userReducer,
    scholarships: scholarshipsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
