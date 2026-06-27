import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "@/store/api/authApi";
import { logout } from "@/store/slice/authSlice";
import { apiSlice } from "@/store/api/apiSlice";
import UserAvatar from "../dashboard/profile/user-avtar";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi(undefined).unwrap();
    } catch {
      // Even if the API call fails, clear local state
    } finally {
      // Clear Redux auth state — sets isAuthenticated=false, isInitialized=true
      dispatch(logout());
      // Reset RTK Query cache so stale /auth/me data doesn't
      // persist and re-authenticate on the next page load
      dispatch(apiSlice.util.resetApiState());
      setOpen(false);
      navigate("/login");
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">

      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-white/10 rounded-md transition-all"
        >

          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-[#00d4d4] to-[#007777]">
            
          <UserAvatar size="sm" />
          </div>

          <svg
            className={`w-4 h-4 text-white transition-transform duration-300 ${open ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>

        </div>

        {open && (
          <div className="absolute right-2 top-12 mt-2 w-64 bg-[#0c1425] border border-white/10 rounded-lg shadow-lg p-3 z-50">

            <p className="text-white font-medium">
              {user?.name}
            </p>

            <p className="text-gray-400 text-xs">
              {user?.email}
            </p>

            <hr className="my-2 border-white/10" />

            <button
              onClick={handleLogout}
              className="w-full text-left text-red-400 hover:text-red-300 text-sm"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default UserMenu;