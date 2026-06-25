import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ExternalLink,
  BookOpen,
  Calendar,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { useGetNoteByIdQuery } from "@/store/api/notesApi";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";
import DeleteNoteDialog from "@/components/dashboard/notes/delete-note-dialog";
import { BookmarkButton } from "@/components/dashboard/notes/book-marks";
import { EditNotesDialog } from "@/components/dashboard/notes/edit-note-dialog";
import DownloadNoteButton from "@/components/dashboard/notes/download-notes";
import { motion } from "framer-motion";

const NoteDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetNoteByIdQuery(id as string);
  const isOwner = String(data?.userId) === String(user?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 space-y-4">
        <AppSkeletonCard />
        <AppSkeletonCard />
        <AppSkeletonCard />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />

          <h2 className="text-xl font-semibold mb-2">Note not found</h2>

          <p className="text-sm text-muted-foreground">
            The note you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
       <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 lg:px-8"
    >
    
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              onClick={() => navigate("/productivity/notes")}
              className="mb-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Notes
            </button>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span>Notes Details</span>
            </div>
            <p className="text-sm text-muted-foreground">
              View and manage your note content.
            </p>
          </div>
       
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <DownloadNoteButton id={data._id} title={data.title} />
                 {isOwner && (
                  <>
              <EditNotesDialog notesData={data} />
              <DeleteNoteDialog id={id as string} />
              </>
            )}
            </div>
        </div>
    <motion.div variants={fadeUpItem}>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl custom-surface shadow-sm">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" />

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between mb-3">
              <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary">
                {data.subjectName}
              </span>
              <div>
                <div className="flex justify-end mb-1">
                  <BookmarkButton
                    id={id as string}
                    isBookmarked={data.isBookmarked}
                  />
                </div>
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Updated {new Date(data.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <h1 className="break-words text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {data.title}
            </h1> 

            <div className="bg-primary/20 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-semibold">
                  Notes Content
                </h2>
              </div>

              <div className="whitespace-pre-wrap break-words text-sm md:text-base leading-7 text-muted-foreground">
                {data.content}
              </div>
            </div>

            {data.fileUrl && (
              <button
                onClick={() => window.open(data.fileUrl, "_blank")}
                className=" mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm sm:text-base font-medium text-primary-foreground transition-all hover:opacity-90"
              >
                View PDF
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
</motion.div>

   <motion.div variants={fadeUpItem}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl custom-surface shadow-sm p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
              Created On
            </p>

            <p className="text-sm sm:text-base font-medium">
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl custom-surface shadow-sm p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
              Last Updated
            </p>

            <p className="text-sm sm:text-base font-medium">
              {new Date(data.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        </motion.div>
      </div>
   </motion.div>
  );
};

export default NoteDetailsPage;
