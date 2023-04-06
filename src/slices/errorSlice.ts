import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
    userError: string,
    scholarshipsError: string,
    savedError: string,
    addSaveError: string,
    deleteSaveError: string
}

export interface ErrorState {
    error: Error
}

const initialState: ErrorState = {
    error: {
        userError: '',
        scholarshipsError: '',
        savedError: '',
        addSaveError: '',
        deleteSaveError: ''
    }
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setUserError: (state, action: PayloadAction <any>) => {
        state.error.userError = action.payload
    },
    setScholarshipsError: (state, action: PayloadAction <any>) => {
        state.error.scholarshipsError = action.payload
    },
    setSavedError: (state, action: PayloadAction <any>) => {
        state.error.savedError = action.payload
    },
    setAddSaveError: (state, action: PayloadAction <any>) => {
        state.error.addSaveError = action.payload
    },
    setDeleteSaveError: (state, action: PayloadAction <any>) => {
        state.error.deleteSaveError = action.payload
    }
  }
});

export const { setUserError, setScholarshipsError, setSavedError, setAddSaveError, setDeleteSaveError } = errorSlice.actions
export default errorSlice.reducer;