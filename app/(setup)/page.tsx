import React from 'react'
import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import InitialModal from '@/components/modals/initial-modal';
import { NextResponse } from 'next/server';
import { Profile } from '@prisma/client';

const SetupPage = async () => {
    const profile = await initialProfile();

    if (profile instanceof NextResponse) {
        return profile;
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });
    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div className="h-full w-full flex justify-center items-center bg-[url('/Background.png')] bg-no-repeat bg-cover bg-center">
            <InitialModal />
        </div>

    )
}

export default SetupPage