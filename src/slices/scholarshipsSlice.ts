import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ScholarshipsState {
    saved: Array<any>
// update type any to be an interface for the object that scholarships should be
}

const initialState: ScholarshipsState = {
    saved: [],
};

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

export default scholarshipsSlice.reducer;