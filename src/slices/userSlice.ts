import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  data: {
    id: string;
    type: string;
    attributes: {
      first_name: string;
      last_name: string;
      image_url: string;
    }
  }
}
export interface UserState {
  user: User
}

const initialState: UserState = {
  user: {
    data: {
      id: "",
      type: "",
      attributes: {
        first_name: "",
        last_name: "",
        image_url: ""
      }
    }
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      //update the types here for the payload
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;