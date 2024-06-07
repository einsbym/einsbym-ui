'use client';

import { AuthService } from '@/auth/auth.service';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import CoverAndPhoto from '@/components/user-profile/profile-images/cover-and-photo';
import Management from '@/components/user-profile/user-post/management';
import { UserType } from '@/types/types';
import { useEffect, useState } from 'react';
import UserBio from '../../components/user-profile/bio';
import Gallery from '../../components/user-profile/gallery';
import GeneralStatistics from '../../components/user-profile/general-statistics';

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

            <main className="mx-auto">
                {/* User's cover and profile picture */}
                <CoverAndPhoto
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                    coverImage={user.coverImage}
                    profileImage={user.profilePicture}
                />

                {/* User's stats */}
                <GeneralStatistics username={user.username} />

                {/* User's content */}
                <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-2">
                    <div>
                        <UserBio userId={user.id} bio={user.bio} />

                        {/* Publish and view post */}
                        <Management userId={user.id} />
                    </div>

                    <Gallery userId={user.id} />
                </div>
            </main>
        </>
    );
}
