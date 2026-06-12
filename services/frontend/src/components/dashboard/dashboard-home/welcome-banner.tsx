import { useSelector } from "react-redux";

const WelcomeBanner = ({ data }: { data: any }) => {
  const user = useSelector((state: any) => state.auth.user);

  const userName = user?.name || "Guest";

  const currentHour = new Date().getHours();
  let greeting = "Good Evening";
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 17) {
    greeting = "Good Afternoon";
  } else if (currentHour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return (
    <div>
      <p className="text-sm text-primary-foreground dark:text-white font-semibold">
        {greeting}
      </p>

      <h1 className="mt-1 text-4xl font-bold text-primary-foreground dark:text-white">
        Welcome back,{" "}
        <span className="text-primary">
          {userName || data?.name}!
        </span>
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        You’re on a <span className="text-yellow-500"> {data?.streak} </span>- day streak and
        <span className="text-yellow-500"> XP-{data?.xp}</span>. Keep going!
      </p>
    </div>
  );
};

export default WelcomeBanner;