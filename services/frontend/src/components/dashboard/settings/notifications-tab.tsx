import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { useUpdateNotificationPreferencesMutation } from "@/store/api/notificationsApi";

export function NotificationsTab() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [updateNotifications, { isLoading }] =
    useUpdateNotificationPreferencesMutation();

  const [settings, setSettings] = useState<any>(null);
  const [initialSettings, setInitialSettings] = useState<any>(null);

  // useEffect(() => {
  //   if (!user) return;

  //   const init = {
  //     dailyStudyReminders: user?.notificationPreferences?.streakReminders ?? true,
  //     xpAchievementAlerts: user?.notificationPreferences?.securityAlerts ?? true,
  //     streakReminders:user?.notificationPreferences?.streakReminders ?? true,
  //     leaderboardUpdates: false,
  //     newContentAlerts:user?.notificationPreferences?.newCourseAlerts ?? true,
  //     emailDigest: false,
  //   };

  //   setSettings(init);
  //   setInitialSettings(init);
  // }, [user]);

  const options = [
    {
      key: "dailyStudyReminders",
      title: "Daily Study Reminders",
      desc: "Get reminded when to study based on your schedule",
    },
    {
      key: "xpAchievementAlerts",
      title: "XP & Achievement Alerts",
      desc: "Notifications when you earn XP or unlock badges",
    },
    {
      key: "streakReminders",
      title: "Streak Reminders",
      desc: "Alert before your streak is about to break",
    },
    {
      key: "leaderboardUpdates",
      title: "Leaderboard Updates",
      desc: "Know when your rank changes",
    },
    {
      key: "newContentAlerts",
      title: "New Content Alerts",
      desc: "Notified when new lessons are added to your subjects",
    },
    {
      key: "emailDigest",
      title: "Email Digest",
      desc: "Weekly progress summary via email",
    },
  ] as const;

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isDirty = useMemo(() => {
    if (!settings || !initialSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);

// const handleSave = async () => {
//   try {
//     const payload = {
//       dailyStudyReminders: settings.dailyStudyReminders,
//       xpAchievementAlerts: settings.xpAchievementAlerts,
//       streakReminders: settings.streakReminders,
//       leaderboardUpdates: settings.leaderboardUpdates,
//       newContentAlerts: settings.newContentAlerts,
//       emailDigest: settings.emailDigest,
//     };

//     const response = await updateNotifications(payload).unwrap();
//     console.log("Response:", response);

//     toast.success(response?.message || "Notification preferences updated");
//     if (response?.preferences) {
//       setSettings(response.preferences);
//       setInitialSettings(response.preferences);
//     } else {
//       setInitialSettings(settings);
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to update notification preferences");
//   }
// };

const handleSave = async () => {
  try {
    const payload = {
      dailyStudyReminders: settings.dailyStudyReminders,
      xpAchievementAlerts: settings.xpAchievementAlerts,
      streakReminders: settings.streakReminders,
      leaderboardUpdates: settings.leaderboardUpdates,
      newContentAlerts: settings.newContentAlerts,
      emailDigest: settings.emailDigest,
    };

    await updateNotifications(payload).unwrap();

    localStorage.setItem(
      "notificationPreferences",
      JSON.stringify(settings)
    );

    setInitialSettings(settings);

    toast.success("Notification preferences updated");
  } catch (error) {
    toast.error("Failed to update notification preferences");
  }
};

useEffect(() => {
  const savedPreferences = localStorage.getItem(
    "notificationPreferences"
  );

  if (savedPreferences) {
    const parsed = JSON.parse(savedPreferences);
    setSettings(parsed);
    setInitialSettings(parsed);
    return;
  }

  if (!user) return;

  const init = {
    dailyStudyReminders:
      user?.notificationPreferences?.dailyStudyReminders ?? true,
    xpAchievementAlerts:
      user?.notificationPreferences?.xpAchievementAlerts ?? true,
    streakReminders:
      user?.notificationPreferences?.streakReminders ?? true,
    leaderboardUpdates:
      user?.notificationPreferences?.leaderboardUpdates ?? true,
    newContentAlerts:
      user?.notificationPreferences?.newContentAlerts ?? true,
    emailDigest:
      user?.notificationPreferences?.emailDigest ?? true,
  };

  setSettings(init);
  setInitialSettings(init);
}, [user]);
  if (!settings) return null;

  return (
    <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-6">
      <h3 className="text-lg font-semibold">
        Notification Preferences
      </h3>

      <div className="divide-y divide-slate-800/50">
        {options.map((opt, index) => (
          <div
            key={opt.key}
            className={`flex items-center justify-between gap-4 ${
              index !== 0 ? "pt-4" : "pt-2"
            }`}
          >
            <div className="flex-1">
              <p className="text-sm font-medium">
                {opt.title}
              </p>
              <p className="text-xs text-slate-400">
                {opt.desc}
              </p>
            </div>

            <Switch
              checked={settings[opt.key]}
              onCheckedChange={() => handleToggle(opt.key)}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSave}
        disabled={isLoading || !isDirty}
        className="gap-2 px-5 shadow-lg"
      >
        <Save className="h-4 w-4" />
        {isLoading ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
}