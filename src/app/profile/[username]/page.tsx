'use client';

import { getCurrentUserFromCookie } from '@/auth/cookies';
import { FIND_USER_BY_USERNAME } from '@/graphql/queries/user';
import { User } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import UserBioAndPost from '../../../components/user-account/user-bio-and-post';
import UserBlurredCover from '../../../components/user-account/user-blurred-cover';
import UserCoverAndPhoto from '../../../components/user-account/user-cover-and-photo';
import UserGallery from '../../../components/user-account/user-gallery';
import UserGeneralStatistics from '../../../components/user-account/user-general-statistics';
import Navbar from '@/components/shared/navbar';

export default function UserProfile() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>();
    const [loggedUser, setLoggedUser] = useState<User | null>();

    const { data, loading, error } = useQuery(FIND_USER_BY_USERNAME, { variables: { username: params.username } });

    // Check if usernames match
    const checkUser = useCallback(async () => {
        const userFromCookie = await getCurrentUserFromCookie();

        if (userFromCookie) {
            if (userFromCookie.username === params.username) {
                router.push('/profile');
            }

            setLoggedUser(userFromCookie);
        }

        setUser(data.findUserByUsername);
    }, [data, params, router]);

    useEffect(() => {
        if (data) {
            checkUser();
        }
    }, [data, checkUser]);

    if (error) {
        return (
            <p>
                you must <a href="/auth/signin">be logged</a> to view this page
            </p>
        );
    }

    if (loading) {
        return 'loading...';
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
                    loggedUserId={loggedUser?.id}
                />

                {/* General statistics */}
                <UserGeneralStatistics />

                {/* User's content */}
                <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                    <div>
                        <UserBioAndPost userId={user?.id || ''} bio={user?.bio || ''} loggedUserId={loggedUser?.id} />
                    </div>

                    <UserGallery userId={user?.id || ''} />
                </div>
            </main>
        </>
    );
}
