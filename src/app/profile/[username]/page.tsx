'use client';

import { getCurrentUserFromCookie } from '@/auth/cookies';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import PostsSection from '@/components/user-profile/posts-section';
import { FIND_USER_BY_USERNAME } from '@/graphql/queries/user';
import { UserType } from '@/types/types';
import { useLazyQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import UserBio from '../../../components/user-profile/bio';
import CoverAndPhoto from '../../../components/user-profile/cover-and-photo';
import Gallery from '../../../components/user-profile/gallery';
import GeneralStatistics from '../../../components/user-profile/general-statistics';

export default function UserProfile() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [user, setUser] = useState<UserType | null>();
    const [loggedUser, setLoggedUser] = useState<UserType | null>();

    // Queries
    const [findUserBYUsername, { error }] = useLazyQuery(FIND_USER_BY_USERNAME);

    // Check if usernames match
    const checkUser = useCallback(async () => {
        const userFromCookie = await getCurrentUserFromCookie();

        if (userFromCookie) {
            if (userFromCookie.username === params.username) {
                return router.push('/profile');
            }

            const { data } = await findUserBYUsername({
                variables: { username: params.username },
            });

            setLoggedUser(userFromCookie);
            setUser(data.findUserByUsername);
        }
    }, [params, router, findUserBYUsername]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    if (error) {
        return (
            <p>
                you must <a href="/auth/signin">be logged</a> to view this page
            </p>
        );
    }

    if (!user && !loggedUser) {
        return <Loading />;
    }

    if (user && loggedUser) {
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
                        loggedUserId={loggedUser.id}
                    />

                    {/* General statistics */}
                    <GeneralStatistics username={user.username} />

                    {/* User's content */}
                    <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                        <div>
                            <UserBio userId={user.id} bio={user.bio} loggedUserId={loggedUser.id} />

                            {/* Publish and view post */}
                            <PostsSection userId={user.id} loggedUserId={loggedUser.id} />
                        </div>

                        <Gallery userId={user.id} />
                    </div>
                </main>
            </>
        );
    }
}
