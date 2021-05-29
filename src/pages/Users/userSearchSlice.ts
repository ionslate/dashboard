import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSearch } from '../../__generated__';

const userSearchSlice = createSlice({
  name: 'users',
  initialState: {} as UserSearch,
  reducers: {
    searchUsers: (state, action: PayloadAction<UserSearch>) => action.payload,
    clearUserSearch: (state) => {},
  },
});

export default userSearchSlice.reducer;

export const { searchUsers, clearUserSearch } = userSearchSlice.actions;
