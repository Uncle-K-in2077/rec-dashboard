import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, thunkAPI) => {
    try {
      const data = await AuthService.login({ email, password });
      if (data) {
        localStorage.setItem("access_token", data.data.access_token);
        navigate("/dashboard/index");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("access_token");
    window.location.href = "/auth/login";
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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
      state.info = action.payload.data;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
      state.isAuthentication = false;
      state.info = null;
    });
  },
});

export default authSlice.reducer;
