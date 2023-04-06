import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SavedState {
    saved: Array<any>
// update type any to be an interface for the object that scholarships should be
}

const initialState: SavedState = {
    saved: [],
};

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
    },
  }
});

export const { setSaved, addSaved, deleteSaved } = savedSlice.actions
export default savedSlice.reducer;