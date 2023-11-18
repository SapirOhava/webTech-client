import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('token')
      ? jwtDecode(localStorage.getItem('token'))
      : null,
  },
  reducers: {
    setToken: (state, action) => {
      try {
        const decodedToken = jwtDecode(action.payload);
        state.token = action.payload; // Store the original token
        state.user = decodedToken; // Store decoded data
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
    //additional reducers like 'refreshToken' could be added here
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
