import { motion } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { NoteHeader } from "@/components/dashboard/notes/note-header";
import {
  NoteCard,
  NoteItem,
} from "@/components/dashboard/notes/note-cards";
import { BookOpen } from "lucide-react";
import { useState } from "react";

const mockNotes: NoteItem[] = [
  {
    id: '1',
    type: 'AI Answer',
    title: 'Integration by Parts Formula',
    description: '∫u dv = uv - ∫v du. Use the LIATE rule to choose \'u\': Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential.',
    category: 'mathematics',
    timeAgo: '2 days ago',
    isBookmarked: true,
  },
  {
    id: '2',
    type: 'My Note',
    title: 'Python List Comprehension',
    description: '[expr for item in iterable if condition] — faster than loops, Pythonic. Examples: squares = [x**2 for x in range(10)]',
    category: 'python',
    timeAgo: 'yesterday',
    isBookmarked: true,
  },
  {
    id: '3',
    type: 'Lesson Note',
    title: "Newton's Laws of Motion",
    description: 'Law 1: Inertia. Law 2: F=ma. Law 3: Every action has equal and opposite reaction. Key for exam application problems.',
    category: 'physics',
    timeAgo: '3 days ago',
    isBookmarked: false,
  },
  {
    id: '4',
    type: 'AI Answer',
    title: 'Photosynthesis — Complete Guide',
    description: '6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂. Two stages: Light Reactions (Thylakoids) and Calvin Cycle (Stroma).',
    category: 'chemistry',
    timeAgo: '4 days ago',
    isBookmarked: true,
  },
  {
    id: '5',
    type: 'Uploaded',
    title: 'Statistics Chapter 4 Notes',
    description: 'Handwritten notes on probability distributions — Normal, Poisson, Binomial. Uploaded PDF, 12 pages.',
    category: 'statistics',
    timeAgo: '1 week ago',
    isBookmarked: false,
  },
  {
    id: '6',
    type: 'AI Answer',
    title: 'DNA vs RNA Differences',
    description: 'DNA: double helix, deoxyribose, has Thymine. RNA: single strand, ribose, has Uracil. DNA = master blueprint, RNA = working copies.',
    category: 'biology',
    timeAgo: '5 days ago',
    isBookmarked: true,
  },
];
const NotesPage = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Saved AI" | "Notes" | "Bookmarked"
  >("Bookmarked");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = mockNotes.filter((note) => {
    if (
      activeTab === "Bookmarked" &&
      !note.isBookmarked
    )
      return false;

    if (
      activeTab === "Saved AI" &&
      note.type !== "AI Answer"
    )
      return false;

    if (
      activeTab === "Notes" &&
      note.type !== "My Note" &&
      note.type !== "Lesson Note"
    )
      return false;

    return (
      note.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      note.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

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
                No resources found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotesPage;