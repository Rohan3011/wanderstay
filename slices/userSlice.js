import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  userEmail: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.uid = action.payload.uid;
      state.userEmail = action.payload.uid;
    },
    setUserLogOutState: (state, action) => {
      state.uid = null;
      state.userEmail = action.payload.uid;
    },
  },
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions;

export const selectUid = (state) => state.user.uid;
export const selectUserEmail = (state) => state.user.userEmail;

export default userSlice.reducer;
