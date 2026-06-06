const statsData = [
  { value: "50K+", label: "Active Students" },
  { value: "500+", label: "Courses Available" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "AI Support" },
];

const StatsSection = () => {
  return (
    <div className="max-w-[40rem] justify-center mx-auto ">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-14">
        {statsData.map((item, index) => (
          <div key={index}>
            <h2 className="text-2xl  font-bold bg-primary bg-clip-text text-transparent">
              {item.value}
            </h2>

            <p className="text-sm  text-textColor mt-2  ">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;