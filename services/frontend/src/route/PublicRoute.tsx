import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const PublicRoute = () => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full bg-[#051522] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Sleek background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full" />
        
        <div className="z-10 flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-wider font-medium animate-pulse">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;