import { createSlice } from '@reduxjs/toolkit';
//import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    birthdayModalShown: localStorage.getItem('birthdayModalShown') === 'true',
  },
  reducers: {
    setTokenAndUser: (state, action) => {
      try {
        // const decodedToken = jwtDecode(action.payload);
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    },
    clearTokenAndUser(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setBirthdayModalShown: (state, action) => {
      localStorage.setItem('birthdayModalShown', action.payload);
      state.birthdayModalShown = action.payload;
    },
    clearBirthdayModalShown(state) {
      localStorage.removeItem('birthdayModalShown');
      state.birthdayModalShown = false;
    },
    //additional reducers like 'refreshToken' could be added here ( do later ..)
  },
});

export const {
  setTokenAndUser,
  clearTokenAndUser,
  setBirthdayModalShown,
  clearBirthdayModalShown,
} = authSlice.actions;
export default authSlice.reducer;
