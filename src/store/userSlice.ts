import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUserProfile: (_, action) => {
      return action.payload;
    },
    removeUserProfile: (_, __) => {
      return null;
    },
  },
});

export const { addUserProfile, removeUserProfile } = userSlice.actions;

export default userSlice.reducer;
