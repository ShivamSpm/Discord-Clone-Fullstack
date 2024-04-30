import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentProfile = async () => {
  console.log("userId");
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  console.log("userId");
  console.log(userId);
  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  return profile;
};