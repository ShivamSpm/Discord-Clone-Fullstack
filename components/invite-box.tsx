"use client";
import { Profile, Server } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
interface InviteBoxProps {
  profile: Profile;
  serverData: Server & { profile: Profile };
}

const InviteBox = ({ profile, serverData }: InviteBoxProps) => {
  const params = useParams();
  const router = useRouter();
  const { inviteCode } = params as { inviteCode: string };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClicked = async () => {
    setIsLoading(true)
    try {
      await axios.patch(`/api/server/accept-invite`, inviteCode);
      router.refresh();
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-[500px] p-5 flex flex-col items-center bg-[#232323] gap-3 rounded-sm shadow-md">
      <img
        src={serverData?.imageUrl}
        alt={serverData.name}
        height={70}
        width={70}
        className="object-cover rounded-sm"
      />
      <p className="text-base text-neutral-400 capitalize">
        {serverData.profile.name} Invited you to join the Server
      </p>
      <p className="text-2xl mb-3">{serverData.name}</p>
      <Button
        disabled={isLoading}
        className="w-full bg-indigo-500 p-2.5 text-lg rounded-sm"
        variant="primary"
        onClick={handleClicked}
        
      >
        Accept Invite
      </Button>
    </div>
  );
};

export default InviteBox;