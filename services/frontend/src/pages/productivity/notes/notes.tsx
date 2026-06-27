import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { NoteHeader } from "@/components/dashboard/notes/note-header";
import { NoteCard } from "@/components/dashboard/notes/note-cards";
import { PaginationWithLinks } from "@/components/pagination-with-link";
import { useGetNotesQuery } from "@/store/api/notesApi";
import { NoteItem, NotesResponse } from "@/interface/notes.interface";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";


const NotesPage = () => {
  const [activeTab, setActiveTab] = useState< "All" | "Saved AI" | "My Notes" | "Bookmarked">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notesData, isLoading} = useGetNotesQuery(undefined) as {
    data: NotesResponse | undefined;
    isLoading: boolean;
  };

const notes: NoteItem[] =
  notesData?.notes?.map((note) => ({
    id: note._id,
    type: note.isPrivate ? "My Note" : "Uploaded",
    title: note.title,
    description: note.content || "",
    category: note.subjectName || "",
    subjectName: note.subjectName || "",
    timeAgo: new Date(note.updatedAt).toLocaleDateString(),
    isBookmarked: note.isBookmarked,
    fileUrl: note.fileUrl || "",
    isPrivate: note.isPrivate,
  })) || [];

const filteredNotes = notes.filter((note) => {
  switch (activeTab) {
    case "Bookmarked":
      if (!note.isBookmarked) return false;
      break;

    case "My Notes":
      if (!note.isPrivate) return false;
      break;

    case "Saved AI":
      if (note.isPrivate) return false;
      break;

    default:
      break;
  }

  const search = searchQuery.toLowerCase();

  return (
    note.title.toLowerCase().includes(search) ||
    note.description.toLowerCase().includes(search) ||
    note.subjectName.toLowerCase().includes(search)
  );
});

  const page = notesData?.page || 1;
  const pageSize = 10;
  const totalCount = notesData?.total || 0;

if (isLoading) {
  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <AppSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

  return (
    <motion.div
      variants={containerStagger(0.12)}
      initial="hidden"
      animate="show"
      className="min-h-screen p-1 lg:p-10"
    >
      <div className="mx-auto space-y-10">
        <motion.div variants={fadeUpItem}>
          <NoteHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </motion.div>

        <motion.div variants={fadeUpItem}>
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/40 dark:bg-[#0d121f]/30">
              <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />

              <h3 className="font-medium text-slate-700 dark:text-slate-200">
                No notes found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </motion.div>

        {totalCount > 9 && (
          <PaginationWithLinks
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
          />
        )}
      </div>
    </motion.div>
  );
};

export default NotesPage;