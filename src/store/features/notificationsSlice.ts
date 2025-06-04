// =============== Imprts ===============

// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { Notification } from "@/interfaces/interfaces";

interface NotificationsState {
  items: Notification[];
}

// =============== Slice ===============

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: "notifications", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    /**
     * Sets the list of notifications in the store.
     *
     * @param state - The current notifications state.
     * @param action - Redux action containing an array of Notification objects.
     */
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
