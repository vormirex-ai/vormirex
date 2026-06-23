import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePasswordMutation } from "@/store/api/authApi";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ChangePasswordDialogProps {
  onPasswordChanged?: () => void;
}

export function ChangePasswordDialog({
  onPasswordChanged,
}: ChangePasswordDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async () => {
    setPasswordError("");

    if (currentPassword === newPassword) {
      setPasswordError("New password cannot be the same as current password.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();

      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setPasswordError("");
      setOpen(false);
      setTimeout(() => {
        onPasswordChanged?.();
      }, 1500);
    } catch (err) {
      toast.error("Failed to change password");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-xs"
          onClick={() => setOpen(true)}
        >
          Change
        </Button>
      </DialogTrigger>

      <DialogContent className="md:w-[40vw] w-[90vw] p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-center text-xs">
            Enter your current password and set a new password. You will be
            asked to sign in again after updating your password.
          </DialogDescription>
        </DialogHeader>

        <div>
          <p className="text-sm mb-1">Current Password</p>

          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm mb-1">New Password</p>

          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);

                if (passwordError) {
                  setPasswordError("");
                }
              }}
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Change Password"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
