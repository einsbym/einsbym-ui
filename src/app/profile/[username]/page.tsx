'use client';

import { getCurrentUserFromCookie } from '@/auth/cookies';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { FIND_USER_BY_USERNAME } from '@/graphql/queries/user';
import { UserType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import BlurredBackground from '../../../components/shared/blurred-background';
import Content from '../../../components/user-account/content';
import CoverAndPhoto from '../../../components/user-account/cover-and-photo';
import Gallery from '../../../components/user-account/gallery';
import GeneralStatistics from '../../../components/user-account/general-statistics';

export default function UserProfile() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [user, setUser] = useState<UserType | null>();
    const [loggedUser, setLoggedUser] = useState<UserType | null>();

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
        return <Loading />;
    }

    if (user && loggedUser) {
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
                        loggedUserId={loggedUser.id}
                    />

                    {/* General statistics */}
                    <GeneralStatistics />

                    {/* User's content */}
                    <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                        <div>
                            <Content userId={user.id} bio={user.bio} loggedUserId={loggedUser.id} />
                        </div>

                        <Gallery userId={user.id} />
                    </div>
                </main>
            </>
        );
    }
}
