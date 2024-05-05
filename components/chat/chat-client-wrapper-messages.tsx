"use client"
import React, { useState } from "react";
import { Channel, Member } from "@prisma/client";
import ChatMessages from "@/components/chat/chat-messages";
import { ReplyContextType } from "@/types";
import ChatInput from "./chat-input";

interface ClientSideWrapperProps {
    member: Member;
    channel: Channel;
}

const ChatClientWrapperMessages = ({member, channel }: ClientSideWrapperProps) => {

    const [replyContext, setReplyContext] = useState<ReplyContextType | null>(null);

    const handleSetReplyContext = (message: ReplyContextType) => {
        
        setReplyContext({
            id: message.id,
            content: message.content,
            authorName: message.authorName
        });
    };

    return (
        <>
        <ChatMessages
            member={member}
            name={channel.name}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
            }}
            paramKey="channelId"
            chatId={channel.id}
            paramValue={channel.id}
            handleSetReplyContext={handleSetReplyContext}
        />
        
        <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{ serverId: channel.serverId, channelId: channel.id, replyToId: replyContext?.id}}
            replyContext={replyContext}
            setReplyContext={setReplyContext}
          />
        </>

    );
};

export default ChatClientWrapperMessages;