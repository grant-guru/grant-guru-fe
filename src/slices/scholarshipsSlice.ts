import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ScholarshipsState {
    filtered: Array<any>
// update type any to be an interface for the object that scholarships should be
}

const initialState: ScholarshipsState = {
    filtered: [],
};

export const scholarshipsSlice = createSlice({
  name: 'scholarships',
  initialState,
  
  reducers: {
    setScholarships: (state, action: PayloadAction <any>) => {
      state.filtered = action.payload;
    }
  }
});

export const { setScholarships } = scholarshipsSlice.actions;

export default scholarshipsSlice.reducer;