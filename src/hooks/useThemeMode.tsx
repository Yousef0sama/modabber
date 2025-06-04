// ========== Imports ========== //

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Redux
import { toggleTheme } from "@/store/features/themeSlice";

// Interfaces
import { RootState } from "@/store";

interface UseThemeMode {
  mode: string;
  toggle: () => void;
}

// ========== Hook ========== //

/**
 * @hook
 * useThemeMode
 *
 * @description
 * Custom hook to get and toggle theme mode using Redux.
 * Handkes:
 * - Retrieves the current theme mode from Redux store.
 * - Provides a toggle function to switch between modes.
 *
 * @returns {{
 *  mode: string,        // current theme mode (e.g. "light" or "dark")
 *  toggle: () => void   // function to toggle theme mode
 * }}
 */
export function useThemeMode() : UseThemeMode {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { mode, toggle };
}
