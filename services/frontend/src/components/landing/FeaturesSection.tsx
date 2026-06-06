import { FeatureCard } from "../FeaturesCard";
import { featuresData } from "../data/featuresData";

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-20 px-4 relative bg-[#0A0B14] ">
      <div className="max-w-[18rem] sm:max-w-[40rem] md:max-w-[65rem] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full  text-[10px] 
        text-xs text-primary bg-[#142128] backdrop-blur-md 
border border-[#1f3b5b]  font-bold uppercase tracking-widest mb-4">
            ✨ Core Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to <span className="text-primary">Master Any Subject</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From AI-powered tutoring to smart roadmaps, we've built the complete learning ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBg={feature.iconBg}
              baseColor={feature?.baseColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;