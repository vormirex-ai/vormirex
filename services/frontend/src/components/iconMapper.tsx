import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io5";
import * as TbIcons from "react-icons/tb";

const ALL_ICONS = {
  ...FaIcons,
  ...FiIcons,
  ...BiIcons,
  ...MdIcons,
  ...AiIcons,
  ...HiIcons,
  ...IoIcons,
  ...TbIcons,
};

interface DynamicIconProps {
  icon: string;
  className?: string;
}

export const DynamicIcon = ({
  icon,
  className = "",
}: DynamicIconProps) => {


  const isImage =
    icon.startsWith("http://") ||
    icon.startsWith("https://");

  if (isImage) {
    return (
      <img
        src={icon}
        alt="icon"
        className={`h-7 w-7 rounded-lg object-cover ${className}`}
      />
    );
  }


  const IconComponent =
    ALL_ICONS[icon as keyof typeof ALL_ICONS];


  if (!IconComponent) {

    return (
      <div className="flex text-2xl items-center justify-center rounded-lg bg-muted ">
        📘
      </div>
    );
  }

  return (
    <IconComponent
      className={` ${className}`}
    />
  );
};