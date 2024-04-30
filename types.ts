import { Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";

export type ServerWithMemberAndProfile = Server & {
  members: (Member & { profile: Profile })[];
};

export type MemberWithProfile = (Member & { profile: Profile })