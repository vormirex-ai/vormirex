import { ScrollArea } from "@/components/ui/scroll-area"

const transcriptData = [
  { time: "00:14", text: "Welcome to Chapter 5 on Integration Techniques. Today we'll explore the powerful method of integration by parts..." },
  { time: "00:45", text: "Recall the product rule for differentiation: d/dx[u·v] = u·v' + v·u'. Integration by parts is essentially the integral form of this rule..." },
  { time: "14:23", text: "So the formula is: ∫u dv = uv - ∫v du. The key is choosing u and dv wisely. A helpful mnemonic is LIATE — Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential..." },
  { time: "18:10", text: "Let's try our first example: ∫x·eˣ dx. Here we set u = x and dv = eˣ dx, which gives du = dx and v = eˣ..." },
  { time: "14:23", text: "So the formula is: ∫u dv = uv - ∫v du. The key is choosing u and dv wisely. A helpful mnemonic is LIATE — Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential..." },
  { time: "18:10", text: "Let's try our first example: ∫x·eˣ dx. Here we set u = x and dv = eˣ dx, which gives du = dx and v = eˣ..." }
]

export function TranscriptSection() {
  return (
    <div className="flex flex-col h-full  ">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-slate-500 rounded-sm" />
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Transcript
        </h4>
      </div>


      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {transcriptData.map((item, index) => (
            <div key={index} className="flex gap-4 group cursor-pointer">
              <span className="text-primary font-mono text-sm font-bold shrink-0">
                {item.time}
              </span>
              <p className=" text-sm leading-relaxed  group-hover:underline transition-colors">
                — {item.text}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}