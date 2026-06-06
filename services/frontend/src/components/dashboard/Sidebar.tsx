import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navGroups } from "../data/sidebar-Items";
import logo from "../../assets/logo.png";
import { X } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("sidebar-scroll");
    if (scrollRef.current && savedScroll) {
      scrollRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(
        "sidebar-scroll",
        scrollRef.current.scrollTop.toString()
      );
    }
  };

  const isActiveRoute = (path: string) => {
    const current = location.pathname;
    if (current === path) return true;

    if (path !== "/dashboard" && current.startsWith(path + "/")) {
      return true;
    }

    return false;
  };
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[17rem] border-r border-border bg-background flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-border">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 w-fit">
            <img
              alt="logo"
              src={logo}
              className="w-5 h-5 dark:brightness-100 brightness-0"
            />
            <span className="font-bold text-foreground">Vormirex</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition"
          >
            <X size={18} />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 space-y-8"
        >
          {navGroups.map((group) => (
            <div key={group.groupLabel}>
              <h3 className="px-4 text-[11px] text-muted-foreground uppercase tracking-widest mb-2">
                {group.groupLabel}
              </h3>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActiveRoute(item.path);

                  return (
                    <NavLink
                      key={`${group.groupLabel}-${item.title}-${item.path}`}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={() =>
                        `relative flex items-center gap-3 p-4 rounded-xl transition-all
                        ${active
                          ? "bg-primary-gradient text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                        }`
                      }
                    >
                      <>
                        <item.icon size={18} />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>

                        {item.isNew && (
                          <span className="ml-auto text-[10px] bg-primary-gradient text-primary-foreground px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}

                        {active && (
                          <motion.div
                            layoutId="active"
                            className="absolute right-0 -translate-y-1/2 w-1 h-6 bg-primary-gradient rounded-l-full"
                          />
                        )}
                      </>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary dark:bg-[#154249] rounded-2xl p-3 mx-4 mb-4">
          <div className="space-y-1">
            <p className="text-slateText dark:text-gray-300 text-sm">
              Upgrade
            </p>
            <p className="font-bold">Go Pro</p>
            <p className="text-slateText dark:text-gray-300 text-xs">
              Unlock Unlimited AI Sessions
            </p>
          </div>

          <button className="bg-white rounded-2xl text-black text-xs py-1 px-5 w-52 my-5">
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;