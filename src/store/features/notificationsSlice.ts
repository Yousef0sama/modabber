// imports

// redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interfaces
import { Notification } from "@/interfaces/interfaces";

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
