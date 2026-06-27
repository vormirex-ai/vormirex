import { Search } from "lucide-react";
import { UploadNoteDialog } from "./upload-notes-dialog";

interface Props {
  activeTab:
  | "All"
  | "Saved AI"
  | "My Notes"
  | "Bookmarked";

  setActiveTab: (
    tab:
      | "All"
      | "Saved AI"
      | "My Notes"
      | "Bookmarked"
  ) => void;

  searchQuery: string;

  setSearchQuery: (
    value: string
  ) => void;
}

export const NoteHeader = ({activeTab,setActiveTab,searchQuery,setSearchQuery}: Props) => {

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-2">
            📝 Notes & Resources
          </h1>

          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Your saved answers, uploaded notes,
            and bookmarked content.
          </p>
        </div>

        <div>

       <UploadNoteDialog/>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

        <div className="relative w-full xl:max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className=" w-full h-11 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0d121f] pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div
          className=" flex items-center gap-1 overflow-x-auto custom-horizontal-scrollbar rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#0d121f] p-1"
        >
          {([ "All", "Saved AI", "My Notes", "Bookmarked"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={` px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all

                ${activeTab === tab
                  ? "bg-primary-gradient dark:bg-none dark:bg-[#1a233d] text-slateText dark:text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};