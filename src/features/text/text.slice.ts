import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  text: string;
}

const initialState: IInitialState = {
  text: '',
};

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    addText: (state: IInitialState, action: PayloadAction<string>) => {
      state.text = action.payload;
    },

    clearText: (state: IInitialState) => {
      state.text = '';
    },
  },
});

export default textSlice.reducer;
export const { addText, clearText } = textSlice.actions;
