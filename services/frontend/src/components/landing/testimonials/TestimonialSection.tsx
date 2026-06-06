import TestimonialCard from "./TestimonialsCard";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Computer Science Student",
    content: "AI Tutor completely changed how I study. The instant explanations are like having a professor available 24/7.",
    initials: "S",
    avatarColor: "bg-blue-600"
  },
  {
    name: "Rahul M.",
    role: "Engineering Student",
    content: "The personalized roadmap feature is incredible. It created a study plan perfectly tailored to my weak spots.",
    initials: "R",
    avatarColor: "bg-purple-600"
  },
  {
    name: "Emily J.",
    role: "Medical Student",
    content: "The video + AI chat split screen is genius! I can watch a lecture and ask questions simultaneously.",
    initials: "E",
    avatarColor: "bg-cyan-600"
  }
];

export default function TestimonialSection() {
  return (

    <section className="py-16 lg:py-20 px-4 relative bg-[#0C0D16]">
      <div className="max-w-[18rem] md:max-w-[65rem] m-auto">

        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full  text-[10px] 
        text-xs text-primary bg-[#142128] backdrop-blur-md 
border border-[#1f3b5b]  font-bold uppercase tracking-widest mb-4">
            💬 Testimonials
          </div>

          <h2 className="z-10 text-4xl md:text-5xl font-bold text-center mb-16 text-white tracking-tight">
            Loved by <span className="text-transparent bg-clip-text bg-primary">Students Worldwide</span>
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}