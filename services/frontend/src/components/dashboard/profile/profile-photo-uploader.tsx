import { useRef, useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { useUploadProfilePhotoMutation, useDeleteProfilePhotoMutation} from "@/store/api/profileApi";
import { toast } from "sonner";
import UserAvatar from "./user-avtar";

export default function ProfilePhotoUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: any) => state.auth.user);
  const [uploadProfilePhoto, { isLoading: isUploading }] = useUploadProfilePhotoMutation();
  const [deleteProfilePhoto, { isLoading: isDeleting }] = useDeleteProfilePhotoMutation();
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setPhoto(user?.profilePhoto || null);
  }, [user?.profilePhoto]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("photo", compressedFile);

      const res = await uploadProfilePhoto(formData).unwrap();
      setPhoto(res?.profilePhoto || URL.createObjectURL(compressedFile));
      toast.success(res?.message || "Profile photo updated successfully");
      e.target.value = "";
    } catch (error: any) {
      toast.error(error?.data?.message || "Upload failed");
      console.error("Upload failed:", error);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    try {
      const response = await deleteProfilePhoto().unwrap();
      setPhoto(null);
      toast.success(response?.message || "Profile photo removed successfully");
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="relative w-20 h-20">
<UserAvatar size="lg" />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {photo ? (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute bottom-0 right-0 p-1.5 bg-red-500 text-white rounded-full border-2 border-white"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute bottom-0 right-0 p-1.5 bg-primary-gradient text-white rounded-full border-2 border-white"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
