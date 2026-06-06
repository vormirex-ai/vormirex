import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function AccountTab() {
  return (
    <div className="space-y-6">

      <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-6">
        <h3 className="text-lg font-semibold">Security</h3>

        <div className="divide-y divide-slate-800/50 space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium ">Change Password</p>
              <p className="text-xs text-slate-400">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" className="text-xs rounded-lg">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400">Add an extra layer of security</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium ">Active Sessions</p>
              <p className="text-xs text-slate-400">1 active session (this device)</p>
            </div>
            <Button variant="outline" className=" rounded-lg text-xs">
              Sign out others
            </Button>
          </div>
        </div>
      </div>


      <div className="custom-surface p-6 rounded-2xl shadow-xl space-y-6">
        <h3 className="text-lg font-semibold text-rose-500">Danger Zone</h3>

        <div className="divide-y divide-red-950/20 space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium">Sign Out</p>
              <p className="text-xs text-slate-400">Sign out from this device</p>
            </div>
            <Button variant="outline" className=" text-xs">
              Sign Out
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium ">Delete Account</p>
              <p className="text-xs text-slate-400">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" className="rounded-lg text-xs">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}