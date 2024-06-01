import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
  classNameAvatar?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, className, classNameAvatar }) => {
  return (
    <Avatar className={cn("flex justify-center items-center", classNameAvatar)}>
      <AvatarImage
        src={src}
        className={cn("h-7 w-7 md:h-10 md:w-10", className)}
      />
    </Avatar>
  );
};

export default UserAvatar;