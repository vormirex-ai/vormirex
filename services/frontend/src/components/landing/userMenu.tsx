import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slice/authSlice";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi(undefined).unwrap();
      dispatch(
        setCredentials({
          user: null,
          token: null,
        })
      );
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
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

          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-[#00d4d4] to-[#007777]">
            {user?.name?.charAt(0).toUpperCase()}
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
          <div className="absolute right-0 mt-2 w-64 bg-[#0c1425] border border-white/10 rounded-lg shadow-lg p-3 z-50">

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