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
import { Eye, EyeOff, KeyRound, ShieldAlert } from "lucide-react";
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

    if (!currentPassword || !newPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setOpen(false);

      setTimeout(() => {
        onPasswordChanged?.();
      }, 1000);
    } catch (err) {
      toast.error("Failed to change password");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs gap-2">
          <KeyRound className="h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-6 space-y-3 rounded-xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>

          <DialogTitle className="text-lg font-semibold">
            Update Password
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground">
            Enter your current password and choose a new secure password.
            You’ll need to sign in again after this change.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <p className="text-sm">Current Password</p>

          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm">New Password</p>

          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordError && (
            <p className="text-xs text-red-500">{passwordError}</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full rounded-lg"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}