import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Palette, Bell, ShieldAlert } from "lucide-react";
import { ProfileTab } from "./profile-tab";
import { AppearanceTab } from "./appearance-tab";
import { NotificationsTab } from "./notifications-tab";
import { AccountTab } from "./account-tab";

export function SettingsContainer() {
  const tabsList = [
    { value: "profile", label: "Profile", icon: User },
    { value: "appearance", label: "Appearance", icon: Palette },
    { value: "notifications", label: "Notifications", icon: Bell },
    { value: "account", label: "Account", icon: ShieldAlert },
  ];

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-6 p-4 md:p-8"
    >

      <div>
        <motion.div variants={fadeUpItem}>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            ⚙️ Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your account, preferences, and notifications.
          </p>
        </motion.div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6 " >
        <motion.div variants={fadeUpItem}>
          <TabsList className="!custom-surface p-1 rounded-xl w-full flex justify-start gap-1 overflow-x-auto">
            {tabsList.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
    flex items-center gap-2
    text-xs font-medium
    px-4 py-2.5
    rounded-lg
    transition-all
    text-slate-500 dark:text-slate-400
    data-[state=active]:bg-card
    dark:data-[state=active]:bg-[#154249]/40
    data-[state=active]:border
    data-[state=active]:border-primary
    data-[state=active]:text-primary
  "
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </motion.div>

        <TabsContent value="profile" asChild>
          <motion.div
            variants={fadeUpItem}
            initial="hidden"
            animate="show"
            className="outline-none focus:ring-0"
          >
            <ProfileTab />
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance" asChild>
          <motion.div
            variants={fadeUpItem}
            initial="hidden"
            animate="show"
            className="outline-none focus:ring-0"
          >
            <AppearanceTab />
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" asChild>
          <motion.div
            variants={fadeUpItem}
            initial="hidden"
            animate="show"
            className="outline-none focus:ring-0"
          >
            <NotificationsTab />
          </motion.div>
        </TabsContent>

        <TabsContent value="account" asChild>
          <motion.div
            variants={fadeUpItem}
            initial="hidden"
            animate="show"
            className="outline-none focus:ring-0"
          >
            <AccountTab />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}


