'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import UserCoverAndPhoto from './components/user-cover-and-photo';
import UserGeneralStatistics from './components/user-general-statistics';
import UserBioAndPost from './components/user-bio-and-post';
import UserPosts from './components/user-posts';
import UserGallery from './components/user-gallery';
import UserBlurredCover from './components/user-blurred-cover';
import { getCurrentUserFromCookie } from '@/actions/cookies';
import { useEffect, useState } from 'react';
import { User } from '@/interfaces/interfaces';

export default function ViewImage() {
    const [user, setUser] = useState<User | null>();
    
    const fetchUser = async () => {
        const user = await getCurrentUserFromCookie();
        setUser(user);
    };

    useEffect(() => {
        fetchUser();
    }, []);
    
    return (
        <>
            <UserBlurredCover coverImage="" />

            <main className="mx-auto lg:pt-12">
                <Navbar />

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
                        <UserBioAndPost userId={user?.id || ''} />
                        <UserPosts />
                    </div>

                    <UserGallery />
                </div>

                <Footer />
            </main>
        </>
    );
}
