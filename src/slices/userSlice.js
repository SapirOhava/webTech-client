// features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    // Replace with your actual API call
    const response = await fetch(`https://your-api/users/${userId}`);
    return response.json();
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    entities: {},
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.entities[action.payload._id] = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
