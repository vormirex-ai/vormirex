import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save } from "lucide-react";

export function ProfileTab() {
  return (
    <div className="space-y-6  custom-surface p-6 rounded-2xl shadow-xl">

      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
          Profile Information
        </h3>
      </div>


      <div className="flex items-center gap-4">

        <div className="relative group cursor-pointer">

          <div className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-white dark:border-slate-800">
            S
          </div>

          <button className="absolute bottom-0 right-0 p-1.5 bg-primary-gradient hover:bg-indigo-500 text-slateText  rounded-full border-2 border-white dark:border-[#0d111c] transition">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        <div>
          <h4 className="text-base font-medium text-slate-900 dark:text-slate-200">
            Sandhya
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            sandhya@gmail.com
          </p>

          <span className="inline-block mt-1.5 text-[11px] font-semibold bg-indigo-100 bg-primary/5 dark:bg-[#154249]/40 border border-primary px-2.5 py-0.5 rounded-full">
            Pro Member
          </span>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Full Name
          </Label>

          <Input
            defaultValue="Alex Johnson"
            className="bg-primary/5 dark:bg-[#154249]/ border border-cyan-500/10  focus:border-primary focus:ring-primary"
          />
        </div>


        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Username
          </Label>

          <Input
            defaultValue="alexj"
            className="bg-primary/5 dark:bg-[#154249]/ border border-cyan-500/10  focus:border-primary focus:ring-primary"
          />
        </div>


        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Email
          </Label>

          <Input
            type="email"
            defaultValue="alex.johnson@email.com"
            className="bg-primary/5 dark:bg-[#154249]/ border border-cyan-500/10  focus:border-primary focus:ring-primary"
          />
        </div>


        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Phone (optional)
          </Label>

          <Input
            type="tel"
            placeholder="+1 234 567 8900"
            className="bg-primary/5 dark:bg-[#154249]/ border border-cyan-500/10  focus:border-primary focus:ring-primary"
          />
        </div>
      </div>


      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Bio
        </Label>

        <Textarea
          defaultValue="Passionate learner focused on Mathematics and Python Programming. Love problem-solving!"
          className="bg-primary/5 dark:bg-[#154249]/ border border-cyan-500/10  focus:border-primary focus:ring-primary"
        />
      </div>


      <Button className="shadow-lg shadow-indigo-500/20 px-5 gap-2">
        <Save className="w-4 h-4" />
        Save Changes
      </Button>
    </div>
  );
}