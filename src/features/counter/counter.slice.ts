import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  num: number;
}

const initialState: IInitialState = {
  num: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: IInitialState) => {
      state.num = state.num + 1;
    },
    decrement: (state: IInitialState) => {
      if (state.num > 0) state.num = state.num - 1;
    },
    incrementBy: (state: IInitialState, action: PayloadAction<number>) => {
      state.num = state.num + action.payload;
    },

    decrementBy: (state: IInitialState, action: PayloadAction<number>) => {
      if (state.num >= action.payload) state.num = state.num - action.payload;
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement, incrementBy, decrementBy } =
  counterSlice.actions;
