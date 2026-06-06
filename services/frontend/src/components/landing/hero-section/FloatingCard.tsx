import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { chatData } from "../../data/chatData";



const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);


export default function CardSection() {
  return (
    <>
      <div className="relative flex items-center justify-center  mt-6 p-10">


        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#1a1a2e,transparent)]" />

        <div className="relative z-10 flex flex-row items-center gap-16 lg:gap-40">
          <div className="relative h-64 hidden md:block ">




            <FloatingCard delay={0}>
              <Card className="w-32 bg-[#16262D] backdrop-blur-lg border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] relative z-10">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="text-yellow-400 text-3xl mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">📐</div>
                  <h3 className="font-bold text-sm">Mathematics</h3>
                  <p className="text-[10px] text-gray-400">156 lessons</p>
                  <div className="w-full h-1 bg-gray-800/50 rounded mt-3 overflow-hidden">
                    <div className="w-2/3 h-full bg-primary shadow-[0_0_8px_#06b6d4]" />
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>


            <FloatingCard delay={1}>
              <Card className="w-32 bg-[#16262D] backdrop-blur-lg border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] absolute -bottom-36 left-12 z-20">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="text-white text-3xl mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">🔬</div>
                  <h3 className="font-bold text-sm">Science</h3>
                  <p className="text-[10px] text-gray-400">178 lessons</p>
                  <div className="w-full h-1 bg-gray-800/50 rounded mt-3 overflow-hidden">
                    <div className="w-1/2 h-full bg-primary shadow-[0_0_8px_#60a5fa]" />
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>


          <div className="relative">
            <Card className="w-[300px] md:w-[400px] bg-[#0F182A] backdrop-blur-sm border border-[#13203C] text-white
          shadow-[0_0_60px_rgba(106,236,225,0.25)] relative py-2 md:py-4">

              <div className="absolute inset-0 rounded-xl bg-[#13203C]/20 blur-2xl -z-10" />


              <CardContent className="p-3 md:py-4 md:px-6">


                <div className="flex items-center gap-2 mb-2 md:mb-4 text-xs text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  VORMI • Online
                </div>


                <div className="space-y-2 md:space-y-3 mb-4">
                  {chatData.map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`p-2 md:p-3 text-xs md:text-sm max-w-[80%] ${msg.sender === "user"
                        ? "ml-auto bg-[#182D3C] border border-blue-500/20 rounded-xl rounded-br-none"
                        : "mr-auto text-slateText bg-primary-gradient border border-white/5 rounded-xl rounded-bl-none"
                        }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>


                <div className="relative">
                  <input
                    className="w-full bg-[#0d1117] border border-white/10 rounded-lg p-3 text-sm focus:outline-none"
                    placeholder="Ask anything..."
                  />
                  <div className="absolute right-3 top-3 flex gap-1 mt-3">
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>


              </CardContent>
            </Card>
          </div>



          <div className="flex items-center hidden md:block">
            <FloatingCard delay={0.5}>
              <Card className="w-32 bg-[#16262D] backdrop-blur-lg border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="text-white text-3xl mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">💻</div>
                  <h3 className="font-bold text-sm">Coding</h3>
                  <p className="text-[10px] text-gray-400">203 lessons</p>
                  <div className="w-full h-1 bg-gray-800/50 rounded mt-3 overflow-hidden">
                    <div className="w-3/4 h-full bg-primary shadow-[0_0_8px_#a855f7]" />
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>


        </div>
      </div>

      <div className="flex md:hidden items-center justify-between gap-2 my-6 px-3 w-full ">

        <FloatingCard delay={0}>
          <Card className="w-[31%] min-w-[95px] bg-[#16262D] backdrop-blur-lg border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] relative z-10 py-2">
            <CardContent className="p-2 flex flex-col items-center text-center">
              <div className="text-yellow-400 text-2xl mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
                📐
              </div>

              <h3 className="font-semibold text-[11px]">
                Mathematics
              </h3>

              <p className="text-[9px] text-gray-400">
                156 lessons
              </p>

              <div className="w-full h-1 bg-gray-800/50 rounded mt-2 overflow-hidden">
                <div className="w-2/3 h-full bg-primary shadow-[0_0_8px_#06b6d4]" />
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={1}>
          <Card className="w-[31%] min-w-[95px] bg-[#16262D] backdrop-blur-lg border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] z-20 py-2">
            <CardContent className="p-2 flex flex-col items-center text-center">
              <div className="text-white text-2xl mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                🔬
              </div>

              <h3 className="font-semibold text-[11px]">
                Science
              </h3>

              <p className="text-[9px] text-gray-400">
                178 lessons
              </p>

              <div className="w-full h-1 bg-gray-800/50 rounded mt-2 overflow-hidden">
                <div className="w-1/2 h-full bg-primary shadow-[0_0_8px_#60a5fa]" />
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={0.5}>
          <Card className="w-[31%] min-w-[95px] bg-[#16262D] backdrop-blur-lg border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] py-2">
            <CardContent className="p-2 flex flex-col items-center text-center">
              <div className="text-white text-2xl mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                💻
              </div>

              <h3 className="font-semibold text-[11px]">
                Coding
              </h3>

              <p className="text-[9px] text-gray-400">
                203 lessons
              </p>

              <div className="w-full h-1 bg-gray-800/50 rounded mt-2 overflow-hidden">
                <div className="w-3/4 h-full bg-primary shadow-[0_0_8px_#a855f7]" />
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

      </div>
    </>
  );
}
