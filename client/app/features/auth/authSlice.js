import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    auth: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.auth = action.payload;
        state.isError = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;

//Get User

export const getUser = createAsyncThunk("FETCH/USER", async (_, thunkAPI) => {
  try {
    let varify = await AsyncStorage.getItem("userToken");
    return JSON.parse(varify ?? {});
  } catch (error) {
    console.log("object", error);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
