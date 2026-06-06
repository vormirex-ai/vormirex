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
  const { theme, fontSize, compactSidebar, reducedAnimations, accentColor } = useSelector(
    (state: RootState) => state.theme
  );
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [updateUiPreferences] = useUpdateUiPreferencesMutation();

  const handleUpdatePreference = async (key: string, value: any) => {
    // Update local Redux state immediately (optimistic UI)
    if (key === "theme") dispatch(value === "dark" ? setTheme("dark") : setTheme("light"));
    else if (key === "fontSize") dispatch(setFontSize(value as FontSize));
    else if (key === "compactSidebar") dispatch(setCompactSidebar(value));
    else if (key === "reducedAnimations") dispatch(setReducedAnimations(value));
    else if (key === "accentColor") dispatch(setAccentColor(value));

    // Update backend database if authenticated
    if (isAuthenticated) {
      try {
        await updateUiPreferences({ [key]: value }).unwrap();
      } catch (error) {
        console.error(`Failed to update UI preference ${key} on backend:`, error);
      }
    }
  };

  const colors = [
    { id: "blue-indigo", bg: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { id: "pink", bg: "bg-gradient-to-r from-pink-500 to-purple-400" },
    { id: "cyan", bg: "bg-gradient-to-r from-cyan-400 to-blue-500" },
    { id: "emerald", bg: "bg-gradient-to-r from-emerald-400 to-teal-500" },
    { id: "orange", bg: "bg-gradient-to-r from-orange-400 to-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-6">
        <h3 className="text-lg font-semibold">Appearance</h3>

        <div className="divide-y divide-slate-800/50 space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium text-slateText dark:text-slate-200">Dark Mode</p>
              <p className="text-xs text-slate-400">Use dark theme across the app</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => handleUpdatePreference("theme", checked ? "dark" : "light")}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium text-slateText dark:text-slate-200">Compact Sidebar</p>
              <p className="text-xs text-slate-400">Show only icons in the sidebar</p>
            </div>
            <Switch
              checked={compactSidebar}
              onCheckedChange={(checked) => handleUpdatePreference("compactSidebar", checked)}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium text-slateText dark:text-slate-200">Reduced Animations</p>
              <p className="text-xs text-slate-400">Minimize motion effects</p>
            </div>
            <Switch
              checked={reducedAnimations}
              onCheckedChange={(checked) => handleUpdatePreference("reducedAnimations", checked)}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium text-slateText dark:text-slate-200">Font Size</p>
              <p className="text-xs text-slate-400">Adjust text size for readability</p>
            </div>
            <div className="flex p-1 bg-[#dff4f7] dark:bg-[#154249] border-primary border border-primary/10 rounded-lg">
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleUpdatePreference("fontSize", size)}
                  className={`text-xs px-3 py-1.5 rounded-md capitalize font-medium transition cursor-pointer ${fontSize === size
                    ? "bg-primary text-white font-bold rounded-md"
                    : "text-slate-400 dark:hover:text-slate-200 hover:text-primary"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="custom-surface p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-slateText dark:text-slate-200">Interactive Tour</h3>
          <p className="text-xs text-slate-400">Replay the guided walkthrough of all features</p>
        </div>
        <Button className="rounded-xl gap-2 text-xs cursor-pointer">
          <Compass className="w-4 h-4" /> Start Tour
        </Button>
      </div>

      <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-3">
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
      </div>
    </div>
  );
}
export default AppearanceTab;