'use client';

import { AuthService } from '@/auth/auth.service';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { Account } from '@/components/user-profile/settings/account';
import { Activity } from '@/components/user-profile/settings/activity';
import { Privacy } from '@/components/user-profile/settings/privacy';
import { Security } from '@/components/user-profile/settings/security';
import { UserType } from '@/types/types';
import { useEffect, useState } from 'react';

export default function UserSettings() {
    const [user, setUser] = useState<UserType | null>();

    useEffect(() => {
        new AuthService().getUser(setUser);
    }, []);

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <main className="flex px-4 items-center justify-center w-full h-screen">
                <div className="h-3/4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <Account />
                    
                    <Activity />

                    <Security />

                    <Privacy user={user} setUser={setUser} />
                </div>
            </main>
        </>
    );
}
