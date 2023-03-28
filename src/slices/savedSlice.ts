import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
// import { fetchCount } from './SavedAPI';

export interface SavedState {
    saved: Array<any>
// update type any to be an interface for the object that scholarships should be
}

const initialState: SavedState = {
    saved: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  
  reducers: {
    setSaved: (state, action: PayloadAction <any>) => {
        //update the types here for the payload
      state.saved = action.payload;
    },
    addSaved: (state, action: PayloadAction <any>) => {
        //update the types here for the payload
      state.saved.push(action.payload);
    },
    deleteSaved: (state, action: PayloadAction <any>) => {
        //update the types here for the payload
      state.saved = state.saved.filter((scholarship) => scholarship.id !== action.payload.id);
    }
  }

});

export const { setSaved, addSaved, deleteSaved } = savedSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Saved.value)`


// export const selectCount = (state: RootState) => state.Saved.value;


export default savedSlice.reducer;