import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  name?: string;
  email?: string;
  role?: "Admin" | "Employee";
  isAuthenticated?: boolean;
}

const initialState: initialStateProps = {
  name: "",
  email: "",
  role: "Employee",
  isAuthenticated: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        role: "Admin" | "Employee";
        isAuthenticated: boolean;
      }>
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export default AuthSlice.reducer;
export const { setUser } = AuthSlice.actions;
