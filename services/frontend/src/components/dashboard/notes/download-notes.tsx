import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useDownloadNoteMutation } from "@/store/api/notesApi";

interface DownloadNoteButtonProps {
  id: string;
  title?: string;
}

const DownloadNoteButton = ({
  id,
  title = "note",
}: DownloadNoteButtonProps) => {
  const [downloadNote, { isLoading }] = useDownloadNoteMutation();

  const handleDownload = async () => {
    try {
      const blob = await downloadNote(id).unwrap();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Note downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download note");
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      size="sm"
      className="gap-2 rounded-lg"
    >
      <Download className="h-4 w-4" />
      {isLoading ? "Downloading..." : "Download"}
    </Button>
  );
};

export default DownloadNoteButton;