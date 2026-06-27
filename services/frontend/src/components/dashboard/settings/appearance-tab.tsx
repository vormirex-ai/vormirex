import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setTheme,
  setFontSize,
  setCompactSidebar,
  setReducedAnimations,
  setAccentColor,
  FontSize,
} from "@/store/slice/themeSlice";
import { useUpdateUiPreferencesMutation } from "@/store/api/authApi";


export function AppearanceTab() {
  const dispatch = useDispatch();
  const { theme, fontSize, compactSidebar } = useSelector(
    (state: RootState) => state.theme
  );

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [updateUiPreferences] = useUpdateUiPreferencesMutation();

  const handleUpdatePreference = async (key: string, value: any) => {
    if (key === "theme") dispatch(value === "dark" ? setTheme("dark") : setTheme("light"));
    else if (key === "fontSize") dispatch(setFontSize(value as FontSize));
    else if (key === "compactSidebar") dispatch(setCompactSidebar(value));
    else if (key === "accentColor") dispatch(setAccentColor(value));

    if (isAuthenticated) {
      try {
        await updateUiPreferences({ [key]: value }).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Appearance Card */}
      <div className="custom-surface p-4 sm:p-6 rounded-2xl shadow-xl space-y-5 sm:space-y-6">
        <h3 className="text-base sm:text-lg font-semibold">Appearance</h3>

        <div className="divide-y divide-slate-800/50 space-y-3 sm:space-y-4">

          {/* Dark Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-slate-400">Use dark theme across the app</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                handleUpdatePreference("theme", checked ? "dark" : "light")
              }
            />
          </div>

          {/* Compact Sidebar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
            <div>
              <p className="text-sm font-medium">Compact Sidebar</p>
              <p className="text-xs text-slate-400">Show only icons in sidebar</p>
            </div>
            <Switch
              checked={compactSidebar}
              onCheckedChange={(checked) =>
                handleUpdatePreference("compactSidebar", checked)
              }
            />
          </div>

          {/* Font Size */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
            <div>
              <p className="text-sm font-medium">Font Size</p>
              <p className="text-xs text-slate-400">
                Adjust text size for readability
              </p>
            </div>

            <div className="flex flex-wrap gap-2 p-1 bg-[#dff4f7] dark:bg-[#154249] border border-primary/10 rounded-lg w-full sm:w-auto">
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleUpdatePreference("fontSize", size)}
                  className={`text-xs px-3 py-1.5 rounded-md capitalize font-medium transition flex-1 sm:flex-none
                    ${
                      fontSize === size
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-primary"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tour Card */}
      {/* <div className="custom-surface p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium">Interactive Tour</h3>
          <p className="text-xs text-slate-400">
            Replay guided walkthrough of features
          </p>
        </div>

        <Button className="rounded-xl gap-2 text-xs w-full sm:w-auto">
          <Compass className="w-4 h-4" /> Start Tour
        </Button>
      </div> */}
         {/* <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-3">
        <h3 className="text-sm font-medium text-slateText dark:text-slate-200">Accent Color</h3>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleUpdatePreference("accentColor", color.id)}
              className={`w-8 h-8 rounded-full ${color.bg} transition-transform cursor-pointer ${accentColor === color.id ? "scale-110 ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0d111c]" : "hover:scale-105"
                }`}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
export default AppearanceTab;