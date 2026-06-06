import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/slice/themeSlice";
import { useUpdateUiPreferencesMutation } from "@/store/api/authApi";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [updateUiPreferences] = useUpdateUiPreferencesMutation();

  const handleToggle = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    dispatch(toggleTheme());

    if (isAuthenticated) {
      try {
        await updateUiPreferences({ theme: nextTheme }).unwrap();
      } catch (error) {
        console.error("Failed to sync theme to backend:", error);
      }
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleToggle}
    >
      {theme === "light" ? (
        <FaMoon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <IoSunny className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
