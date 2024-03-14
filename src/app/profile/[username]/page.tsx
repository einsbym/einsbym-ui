'use client';

import Navbar from '@/components/navbar';
import { FIND_USER_BY_USERNAME } from '@/graphql/queries/user';
import { User } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import UserBioAndPost from '../components/user-bio-and-post';
import UserBlurredCover from '../components/user-blurred-cover';
import UserCoverAndPhoto from '../components/user-cover-and-photo';
import UserGallery from '../components/user-gallery';
import UserGeneralStatistics from '../components/user-general-statistics';
import { getCurrentUserFromCookie } from '@/actions/cookies';

export default function UserProfile() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>();

    const { data, loading } = useQuery(FIND_USER_BY_USERNAME, { variables: { username: params.username } });

    // Check if usernames match
    const checkUser = useCallback(async () => {
        const user = await getCurrentUserFromCookie();

        if (user?.username === params.username) {
            console.log('Hey its you!');
            router.push('/profile');
        }

        setUser(data.findUserByUsername);
    }, [data, params, router]);

    useEffect(() => {
        if (data) {
            checkUser();
        }
    }, [data, checkUser]);

    if (loading) {
        return 'carregando...';
    }

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
            </main>
        </>
    );
}
