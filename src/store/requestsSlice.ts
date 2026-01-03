import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    setRequests: (_, action) => action.payload,
  },
});

export const { setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
