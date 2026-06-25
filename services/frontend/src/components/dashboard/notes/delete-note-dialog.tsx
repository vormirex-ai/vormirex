import { toast } from "sonner";
import { Trash2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

import { Button } from "@/components/ui/button";
import { useDeleteNoteMutation } from "@/store/api/notesApi";

interface Props {
  id: string;
}

const DeleteNoteDialog = ({ id }: Props) => {
  const navigate = useNavigate();
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  const handleDelete = async () => {
    try {
      await deleteNote(id).unwrap();
      toast.success("Note deleted successfully");
      navigate("/productivity/notes");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="rounded-lg gap-2">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xl border-red-200">
        <AlertDialogHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>

          <AlertDialogTitle className="text-xl text-red-600 m-auto">
            Delete Note
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-muted-foreground m-auto flex text-center">
            This action is permanent and cannot be undone.
            <br />
            The note will be removed from your system permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer */}
        <AlertDialogFooter className="gap-2 ">
          <AlertDialogCancel className="rounded-lg">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 rounded-lg"
          >
            {isLoading ? "Deleting..." : "Yes, Delete it"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNoteDialog;