import { createSlice } from '@reduxjs/toolkit';
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    authStatus: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
});
export const { setUser, setAuthStatus } = UserSlice.actions;
export default UserSlice.reducer;
