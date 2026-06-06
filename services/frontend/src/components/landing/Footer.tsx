import React from "react";
import logo from "../../assets/logo.png";
import { footerConfig } from "../data/footerData";


const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#040816] text-white">

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-6 py-16 lg:px-10">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="logo"
                className="h-9 w-9 object-contain"
              />

              <h2 className="text-2xl font-bold tracking-wide">
                {footerConfig.companyName}
              </h2>
            </div>

            <p className="max-w-sm leading-7 text-slate-400 text-sm">
              {footerConfig.description}
            </p>

            <div className="flex items-center gap-3 text-sm">
              {footerConfig.socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-primary hover:bg-primary/20"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {footerConfig.sections.map((section, index) => (
            <div key={index} className="text-sm">
              <h3 className="mb-6 text-lg font-semibold uppercase tracking-wide">
                {section.title}
              </h3>

              <div className="space-y-4 text-slate-400">
                {section.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="block transition hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          {footerConfig.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;