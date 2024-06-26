
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import ChatHeader from "@/components/chat/chat-header";
import ChatClientWrapperMessages from "@/components/chat/chat-client-wrapper-messages";
import MediaRoom from "@/components/media-room";

interface PageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: PageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }


  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />

      {channel.type === ChannelType.TEXT && (
        <>
          <ChatClientWrapperMessages
            member={member}
            channel={channel}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;