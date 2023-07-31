import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isComepleted: false,
  isLoading: false,
  hasError: false,
  message: "",
};

const submitFormData = createAsyncThunk(
  "localBodyFormTwo/submitFormData",
  async (data) => {
   
    const response = await axios.request({
      url: `http://127.0.0.1:3333/form2/submit`,
      method: `POST`,
      data: { data },
    });
    return response;
  }
);

const localBodyFormTwoSlice = createSlice({
  name: "localBodyFormTwo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isComepleted = true;
        state.message = action.payload.data.message;
        state.hasError = false;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.isLoading = false;
        state.isComepleted = true;
        state.message = "Server Error"
        state.hasError = true;
      });
  },
});

const LocalBodyFormTwoAction = localBodyFormTwoSlice.actions;

const LocalBodyFormTwoReducer = localBodyFormTwoSlice.reducer;

export { LocalBodyFormTwoAction, LocalBodyFormTwoReducer, submitFormData };
