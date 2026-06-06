import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function NotificationsTab() {
  const options = [
    { title: "Daily Study Reminders", desc: "Get reminded when to study based on your schedule", defaultChecked: true },
    { title: "XP & Achievement Alerts", desc: "Notifications when you earn XP or unlock badges", defaultChecked: true },
    { title: "Streak Reminders", desc: "Alert before your streak is about to break", defaultChecked: true },
    { title: "Leaderboard Updates", desc: "Know when your rank changes", defaultChecked: false },
    { title: "New Content Alerts", desc: "Notified when new lessons are added to your subjects", defaultChecked: false },
    { title: "Email Digest", desc: "Weekly progress summary via email", defaultChecked: true },
  ];

  return (
    <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-6">
      <h3 className="text-lg font-semibold ">Notification Preferences</h3>

      <div className="divide-y divide-slate-800/50 space-y-4">
        {options.map((opt, index) => (
          <div key={index} className={`flex items-center justify-between ${index !== 0 ? "pt-4" : "pt-2"}`}>
            <div>
              <p className="text-sm font-medium ">{opt.title}</p>
              <p className="text-xs text-slate-400">{opt.desc}</p>
            </div>
            <Switch defaultChecked={opt.defaultChecked} />
          </div>
        ))}
      </div>

      <Button className="shadow-lg px-5 gap-2 pt-2">
        <Save className="w-4 h-4" /> Save Preferences
      </Button>
    </div>
  );
}