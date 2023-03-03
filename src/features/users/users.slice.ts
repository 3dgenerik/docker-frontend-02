import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IInitialState {
  isLoaded: boolean;
  users: IUser[];
  error: string;
}

const initialState: IInitialState = {
  isLoaded: false,
  users: [],
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersPadding: (
      state: IInitialState,
      action: PayloadAction<string>
    ) => {
      state.isLoaded = true;
    },
    fetchUsersFullFilled: (
      state: IInitialState,
      action: PayloadAction<IUser[]>
    ) => {
      state.isLoaded = false;
      state.users = action.payload;
    },
    fetchUsersReject: (state: IInitialState, action: PayloadAction<string>) => {
      state.isLoaded = false;
      state.users = [];
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { fetchUsersPadding, fetchUsersFullFilled, fetchUsersReject } =
  usersSlice.actions;
