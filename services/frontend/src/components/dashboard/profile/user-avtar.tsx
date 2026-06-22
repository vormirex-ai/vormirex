import { useSelector } from "react-redux";

type Props = {
  size?: "sm" | "md" | "lg";
};

export default function UserAvatar({ size = "md" }: Props) {
  const user = useSelector((state: any) => state.auth.user);
  const initials = user?.name?.charAt(0)?.toUpperCase() || "U";

  const sizeClass =
    size === "sm"
      ? "w-8 h-8 text-sm"
      : size === "md"
      ? "w-10 h-10 text-base"
      : "w-20 h-20 text-3xl";

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden bg-primary-gradient flex items-center justify-center text-white font-bold`}
    >
      {user?.profilePhoto ? (
        <img
          src={user?.profilePhoto}
          alt="profile"
          className="w-full h-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}