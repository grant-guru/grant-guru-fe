import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export default userSlice.reducer;