import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
// import { fetchCount } from './SavedAPI';

export interface ScholarshipsState {
    saved: Array<any>
// update type any to be an interface for the object that scholarships should be
}

const initialState: ScholarshipsState = {
    saved: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const scholarshipsSlice = createSlice({
  name: 'scholarships',
  initialState,
  
  reducers: {
    setScholarships: (state, action: PayloadAction <any>) => {
        //update the types here for the payload
      state.saved = action.payload;
    }
  }

});

export const { setScholarships } = scholarshipsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Saved.value)`


// export const selectCount = (state: RootState) => state.Saved.value;


export default scholarshipsSlice.reducer;