import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // if (!params.serverId) {
    //   return new NextResponse("Bad Request Server Id Missing", { status: 400 });
    // }
    const inviteCode = await req.text();
    console.log("invite-Code#@#@#");
    console.log(inviteCode);

    const server = await db.server.update({
        where: {
          inviteCode: inviteCode,
        },
        data: {
          members: {
            create: [
              {
                profileId: profile.id,
              },
            ],
          },
        },
      });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[Generate Invite Code Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}