import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useDeleteAccountMutation } from "@/store/api/authApi";
import { logout } from "@/store/slice/authSlice";
import { apiSlice } from "@/store/api/apiSlice";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleDelete = async () => {
  try {
    const response = await deleteAccount().unwrap();
    toast.success("Account deleted successfully");
    localStorage.clear();
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());

    navigate("/sign-up");
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete account. Please try again.");
  }
};

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="text-xs gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xl border-red-200">

        <AlertDialogHeader className="text-center space-y-3">

           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>

          <AlertDialogTitle className="text-red-600 text-lg m-auto">
            Delete Account
          </AlertDialogTitle>

          <AlertDialogDescription className="text-xs text-muted-foreground m-auto flex text-center">
            This action is permanent and cannot be undone.
            All your data including notes and settings will be removed.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <div className="rounded-lg bg-primary/20 p-3 text-xs text-red-600 flex m-auto">
          ⚠️ You will lose all your data permanently
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-lg">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 rounded-lg"
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}