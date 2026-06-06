import { useState } from "react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import UserMenu from "./userMenu";

const AiChatNavbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector(
    (state: any) => state.auth
  );

  return (
    <>
      <nav
        className="
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          bg-[#040812]/60
          backdrop-blur-xl
          border-b border-white/10
        "
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10">

          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                className="w-8 h-8"
                alt="logo"
              />

              <span className="text-white font-bold text-xl">
                VORMIREX
              </span>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-8">

              <p
                className="
                  text-slate-300
                  hover:text-primary
                  cursor-pointer
                  text-sm
                  transition
                "
                onClick={() => {
                  navigate("/#hero");
                }}
              >
                Home
              </p>

              {user && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="
                    relative text-sm text-slate-300
                    hover:text-primary
                    transition-all duration-300
                    group pb-1
                  "
                >
                  Dashboard

                  <span
                    className="
                      absolute left-0 bottom-0 h-[2px] w-0
                      bg-primary
                      group-hover:w-full
                      transition-all duration-300
                    "
                  />
                </button>
              )}

              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="secondary"
                  >
                    Sign In
                  </Button>

                  <Button
                    onClick={() => navigate("/login")}
                  >
                    Get Started Free
                  </Button>
                </>
              )}
            </div>

            {/* MOBILE MENU */}
            <div className="md:hidden flex items-center gap-4">

              {/* HOME ALWAYS SHOW */}
              <button
                onClick={() => navigate("/#hero")}
                className="
                  text-sm text-slate-300
                  hover:text-primary
                  transition
                "
              >
                Home
              </button>

              {user && <UserMenu />}

              {/* MENU TOGGLE */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white text-2xl"
              >
                {isOpen ? "✕" : "☰"}
              </button>

            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isOpen && (
          <div
            className="
              md:hidden
              bg-[#03060F]
              border-t border-slate-800
              px-4 py-5
              space-y-4
            "
          >

            {user && (
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="
                  block w-full text-left
                  text-slate-300
                  hover:text-primary
                  transition
                "
              >
                Dashboard
              </button>
            )}

            {!user && (
              <div className="space-y-3">

                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </Button>

                <Button
                  className="w-full"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  Get Started Free
                </Button>

              </div>
            )}
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default AiChatNavbar;