// imports

// hooks
import { useDispatch, useSelector } from "react-redux";

// redux
import { toggleTheme } from "@/store/features/themeSlice";

// interfaces
import { RootState } from "@/store";

/**
 * Custom hook to get current theme mode and toggle it.
 * Uses Redux store for state management.
 */
export function useThemeMode() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { mode, toggle };
}
