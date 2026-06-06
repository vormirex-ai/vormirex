import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import {
  Terminal,
  Search,
  ArrowUpDown,
  CornerDownLeft,
} from "lucide-react";

import { navGroups } from "../data/sidebar-Items";
import { useNavigate } from "react-router-dom";

const CommandMenu = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const filteredGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Terminal size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden border-cyan-500/20 bg-card gap-0 min-w-[550px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Navigation Menu</DialogTitle>
        </DialogHeader>

        <div className="flex items-center px-4 py-4 border-b border-cyan-500/10">
          <Search className="mr-3 h-5 w-5 text-cyan-400 opacity-70" />

          <input
            placeholder="Search pages, actions, subjects..."
            className="flex-1 bg-transparent outline-none text-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 space-y-4 custom-scrollbar">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div key={group.groupLabel}>
                <h3 className="px-3 py-2 text-[10px] font-bold tracking-widest text-textColor uppercase">
                  {group.groupLabel}
                </h3>

                <div className="space-y-1">
                  {group.items.map((item) => (
                    <div
                      key={`${group.groupLabel}-${item.path}-${item.title}`}
                      onClick={() => handleNavigate(item.path)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-primary-gradient group dark:hover:text-black"
                    >
                      <div className="p-2 rounded-lg bg-border border border-slate-800 group-hover:border-cyan-500/50">
                        <item.icon className="h-4 w-4 text-cyan-400" />
                      </div>

                      <span className="flex-1 text-sm font-medium">
                        {item.title}
                      </span>

                      <div className="flex gap-1">
                        <span className="text-[10px] text-textColor font-mono">
                          G
                        </span>

                        <span className="text-[10px] text-textColor font-mono">
                          {item.title[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-textColor text-sm">
              No results found for "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-border border-t border-cyan-500/10 text-[10px] text-textColor font-mono">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" /> navigate
            </span>

            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> select
            </span>

            <span className="flex items-center gap-1">
              <span className="border px-1 rounded bg-border border-slate-700">
                esc
              </span>
              close
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="border px-1 rounded bg-border border-slate-700">
              Ctrl K
            </span>
            toggle
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandMenu;








