import React from "react";
import { Hash } from "lucide-react";
import UserAvatar from "../user-avatar";
import MobileToggle from "../mobile-toggle";
// import MobileToggle from "../MobileToggle";
import SocketIndicator from "../socket-indicator";
import ChatVideoBtn from "./chat-video-button";
// import ChatVideoBtn from "./ChatVideoBtn";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  serverId,
  name,
  type,
  imageUrl,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">

      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="mx-2 w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar
          src={imageUrl}
          className="mr-2 h-8 w-8 md:h-8 md:w-8 object-cover"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoBtn />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;