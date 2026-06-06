import { Outlet } from "react-router-dom";


const AuthLayout = () => {
  return (
    <div className="bg-[#030914] min-h-screen w-full flex items-center justify-center  relative overflow-hidden ">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />

      <div className="w-full relative z-10">

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;