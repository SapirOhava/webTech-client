import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('token')
      ? jwtDecode(localStorage.getItem('token'))
      : null,
    birthdayModalShown: localStorage.getItem('birthdayModalShown') === 'true',
  },
  reducers: {
    setToken: (state, action) => {
      try {
        const decodedToken = jwtDecode(action.payload);
        state.token = action.payload;
        state.user = decodedToken;
        localStorage.setItem('token', action.payload);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    },
    clearToken(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
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
  setToken,
  clearToken,
  setBirthdayModalShown,
  clearBirthdayModalShown,
} = authSlice.actions;
export default authSlice.reducer;
