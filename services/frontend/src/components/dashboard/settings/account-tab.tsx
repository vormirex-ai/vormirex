import { ChangePasswordDialog } from "@/components/auth/change-password-dialog";
import { DeleteAccountButton } from "@/components/auth/delete-account-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { apiSlice } from "@/store/api/apiSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { logout } from "@/store/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export function AccountTab() {
   const navigate = useNavigate();
    const dispatch = useDispatch();
   const [logoutApi] = useLogoutMutation();

   
     const handleLogout = async () => {
       try {
         await logoutApi(undefined).unwrap();
       } catch {
       } finally {
         dispatch(logout());
   
         dispatch(apiSlice.util.resetApiState());
         navigate("/login");
       }
     };

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
         <ChangePasswordDialog/>
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
              <p className="text-sm font-medium">Log Out</p>
              <p className="text-xs text-slate-400">Logout out from this device</p>
            </div>
            <Button
              onClick={handleLogout}
            variant="outline" className=" text-xs">
              Logout
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm font-medium ">Delete Account</p>
              <p className="text-xs text-slate-400">Permanently delete your account and all data</p>
            </div>
          <DeleteAccountButton />
          </div>
        </div>
      </div>
    </div>
  );
}