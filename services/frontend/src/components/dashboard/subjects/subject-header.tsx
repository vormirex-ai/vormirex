import { Search } from "lucide-react";

export const SubjectHeader = ({
  activeTab,
  setActiveTab,
  search,
  setSearch,
}: any) => {
  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-2">
            📚 Subjects
          </h1>
          <p className="text-textColor mt-1 text-sm md:text-base">
            Explore and continue your learning journey across all subjects.
          </p>
        </div>

        <div className="flex custom-surface p-1 rounded-lg">
          {["All Subjects", "In Progress", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${activeTab === tab
                ? "bg-border"
                : "text-textColor hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-textColor"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subjects, topics..."
          className="w-full custom-surface rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

    </div>
  );
};