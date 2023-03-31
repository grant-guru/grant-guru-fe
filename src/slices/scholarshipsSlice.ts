import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Scholarship {
  id: string,
  type: string,
  attributes: {
      title: string,
      organization: string,
      amount: string,
      description: string,
      deadline: string,
      education: string,
      state: string,
      women: boolean,
      lgbt: boolean,
      ethnicity: Array<string>,
      veteran: boolean,
      immigrant: boolean,
      url: string,
      image_url: string
  }
}

export interface ScholarshipsState {
    filtered: Array<Scholarship>
// update type any to be an interface for the object that scholarships should be
}

const initialState: ScholarshipsState = {
  filtered: [],
};

export const scholarshipsSlice = createSlice({
  name: 'scholarships',
  initialState,
  
  reducers: {
    setScholarships: (state, action: PayloadAction<Array<Scholarship>>) => {
        //update the types here for the payload

      state.filtered = action.payload;
    }
  }
});

export const { setScholarships } = scholarshipsSlice.actions;

export default scholarshipsSlice.reducer;