import logo from "@/assets/logo.png";

export function ChatLoading() {
  return (
    <div className="flex gap-4 items-end my-6">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-gradient flex items-center justify-center">
        <img src={logo} alt="AI" className="w-4 h-4" />
      </div>

      <div className="bg-[#27545A] px-5 py-4 rounded-2xl border border-cyan-500/10 flex gap-1">
        <span className="w-2 h-2 rounded-full bg-white animate-bounce" />
        <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
        <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}