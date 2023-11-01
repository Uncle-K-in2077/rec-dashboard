import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, thunkAPI) => {
    try {
      const data = await AuthService.login({ email, password });
      console.log(data);
      if (data) {
        // localStorage.setItem("token", data);
        navigate("/dashboard/index");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthentication: false,
    info: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthentication = true;
      state.info = action.payload;
    });
  },
});

export default authSlice.reducer;
