'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { User } from '@/interfaces/interfaces';
import { AuthService } from '@/services/auth-config';
import { useEffect, useState } from 'react';
import UserBioAndPost from './components/user-bio-and-post';
import UserBlurredCover from './components/user-blurred-cover';
import UserCoverAndPhoto from './components/user-cover-and-photo';
import UserGallery from './components/user-gallery';
import UserGeneralStatistics from './components/user-general-statistics';

export default function UserProfile() {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        new AuthService().getUser(setUser);
    }, []);

    return (
        <>
            <Navbar />
            <UserBlurredCover coverImage={user?.coverImage || ''} />

            <main className="mx-auto lg:pt-24">
                {/* User's cover and profile picture */}
                <UserCoverAndPhoto
                    id={user?.id || ''}
                    firstName={user?.firstName || ''}
                    lastName={user?.lastName || ''}
                    coverImage={user?.coverImage || ''}
                    profileImage={user?.profilePicture || ''}
                />

                {/* General statistics */}
                <UserGeneralStatistics />

                {/* User's content */}
                <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                    <div>
                        <UserBioAndPost userId={user?.id || ''} bio={user?.bio || ''} />
                    </div>

                    <UserGallery userId={user?.id || ''} />
                </div>

                <Footer />
            </main>
        </>
    );
}
