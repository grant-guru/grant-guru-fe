import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
// import { fetchCount } from './SavedAPI';

interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserState {
    user: User
}

const initialState: UserState = {
    user: {
        id: 0,
        name: '',
        email: ''
    }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction <User>) => {
        //update the types here for the payload
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Saved.value)`


// export const selectCount = (state: RootState) => state.Saved.value;


export default userSlice.reducer;