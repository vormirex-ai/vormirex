import { Bookmark } from "lucide-react";
import { useState } from "react";
import { useUpdateNoteMutation } from "@/store/api/notesApi";
import { toast } from "sonner";

interface Props {
  id: string;
  isBookmarked: boolean;
}

export const BookmarkButton = ({ id, isBookmarked }: Props) => {
  const [updateNote] = useUpdateNoteMutation();
  const [localBookmark, setLocalBookmark] = useState(isBookmarked);

const handleToggle = async (e: React.MouseEvent) => {
  e.stopPropagation();
  const newValue = !localBookmark;
  setLocalBookmark(newValue);

  try {
    const formData = new FormData();
    formData.append("isBookmarked", String(newValue));

    await updateNote({  id, body: formData}).unwrap();

    toast.success(newValue  ? "Note added to bookmarks":"Note removed from bookmarks");
  } catch (err) {
    setLocalBookmark(!newValue);

    toast.error("Failed to update bookmark");
    console.error(err);
  }
};

  return (
    <button
      onClick={handleToggle}
      className={`
        flex h-8 w-8 items-center justify-center rounded-lg transition-colors
        ${
          localBookmark
            ? "bg-primary text-white"
            : "text-muted-foreground hover:bg-muted"
        }
      `}
    >
      <Bookmark
        className={`w-4 h-4 ${localBookmark ? "fill-current" : ""}`}
      />
    </button>
  );
};