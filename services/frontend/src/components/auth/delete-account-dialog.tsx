import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDeleteAccountMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/authSlice";
import { apiSlice } from "@/store/api/apiSlice";
import { useNavigate } from "react-router";

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response= await deleteAccount().unwrap();
      console.log(response)

      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());

      navigate("/signup"); 
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        className="rounded-lg text-xs"
        onClick={() => setOpen(true)}
      >
        Delete Account
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="custom-surface  p-6 rounded-xl w-[320px] space-y-4">
            <h2 className=" text-lg font-semibold">
              Delete Account?
            </h2>

            <p className="text-sm text-textColor">
              This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}