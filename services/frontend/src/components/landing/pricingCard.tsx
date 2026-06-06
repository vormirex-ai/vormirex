import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { pricingPlans } from "../data/pricingData";

export default function CollegePricingSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0B14] px-6 py-16 lg:py-24 text-white">
      <div className="relative z-10 mx-auto max-w-[18rem] md:max-w-5xl">
        <h2 className="mb-16 text-center text-5xl font-bold md:text-6xl">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-[#6aece1] to-[#4fd1c5] bg-clip-text text-transparent">
            Learning Plan
          </span>
        </h2>

        {/* Cards */}
        <div className="grid gap-8  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan: any, index: number) => (
            <Card
              key={index}
              className={`
    relative overflow-visible rounded-3xl backdrop-blur-xl
    bg-[#0D1323]
    border transition-all duration-500 py-2
    ${plan.featured
                  ? "scale-105 border-[#6aece1]/50 shadow-[0_0_40px_rgba(106,236,225,0.25)]"
                  : "border-white/10"
                }
  `}
            >
              {plan.featured && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#6aece1]/10 to-purple-500/5 z-0 rounded-3xl" />
              )}

              {plan.featured && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-30">
                  <Badge className="rounded-full bg-[#6aece1] px-5 py-2 font-semibold text-black shadow-lg">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <CardContent className="relative z-10  p-6 md:p-8">
                {/* Plan Name */}
                <p className="mb-5 md:mb-8 text-center text-sm font-semibold tracking-widest text-slate-400">
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mb-3 text-center">
                  <span
                    className={`
                      text-2xl md:text-5xl font-bold
                      ${plan.featured ? "text-[#6aece1]" : "text-white"}
                    `}
                  >
                    {plan.price}
                  </span>

                  {plan.monthly && (
                    <span className="text-lg text-slate-400">
                      {plan.monthly}
                    </span>
                  )}
                </div>

                {/* Subtext */}
                <p className="mb-5 md:mb-8 text-center text-slate-500">
                  {plan.subtext}
                </p>

                {/* Features */}
                <ul className="mb-6 md:mb-10 space-y-2 md:space-y-4">
                  {plan.features.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <Check className="h-4 w-4 text-[#6aece1]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  className="w-full rounded-xl py-6 text-base font-semibold"
                  variant={plan.featured ? "default" : "secondary"}
                >
                  {plan.button}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
