'use client';

import { AuthService } from '@/auth/auth.service';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { UserType } from '@/types/types';
import { useEffect, useState } from 'react';
import BlurredBackground from '../../components/shared/blurred-background';
import Content from '../../components/user-account/content';
import CoverAndPhoto from '../../components/user-account/cover-and-photo';
import Gallery from '../../components/user-account/gallery';
import GeneralStatistics from '../../components/user-account/general-statistics';

export default function UserProfile() {
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
            <BlurredBackground coverImage={user.coverImage} />

            <main className="mx-auto lg:pt-24">
                {/* User's cover and profile picture */}
                <CoverAndPhoto
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    profileImage={user.profilePicture}
                />

                {/* General statistics */}
                <GeneralStatistics />

                {/* User's content */}
                <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                    <div>
                        <Content userId={user.id} bio={user.bio} />
                    </div>

                    <Gallery userId={user.id} />
                </div>
            </main>
        </>
    );
}
