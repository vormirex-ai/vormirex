import { useSelector } from "react-redux";

type Props = {
  size?: "sm" | "md" | "lg";
};

export default function UserAvatar({ size = "md" }: Props) {
  const user = useSelector((state: any) => state.auth.user);
  const initials = user?.name?.charAt(0)?.toUpperCase() || "U";

  const sizeClass =
    size === "sm"
      ? "w-10 h-10 text-sm leading-none"
      : size === "md"
        ? "w-10 h-10 text-base leading-none"
        : "w-20 h-20 text-3xl leading-none";

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden bg-primary-gradient grid place-items-center text-white font-semibold leading-none`}
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
