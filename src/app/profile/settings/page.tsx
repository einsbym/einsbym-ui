'use client';

import { AuthService } from '@/auth/auth.service';
import { createUserCookie } from '@/auth/cookies';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { UPDATE_USER_VISIBILITY } from '@/graphql/mutations/user';
import { FIND_ACTIVITIES, ONLINE_INSTANCES } from '@/graphql/queries/user';
import { UserType } from '@/types/types';
import { formatDate } from '@/utils/formatted-date';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { MdManageAccounts, MdOutlinePrivacyTip } from 'react-icons/md';
import { PiSecurityCamera } from 'react-icons/pi';
import { RxActivityLog } from 'react-icons/rx';

export default function UserSettings() {
    const [user, setUser] = useState<UserType | null>();
    const [message, setMessage] = useState<string | null>();

    // Queries
    const { data: onlineInstances } = useQuery(ONLINE_INSTANCES);
    const { data: userActivityLog } = useQuery(FIND_ACTIVITIES);

    // Mutations
    const [updateUserVisibility] = useMutation(UPDATE_USER_VISIBILITY);

    const togglePrivateProfile = async (isPrivate: boolean) => {
        const { data } = await updateUserVisibility({
            variables: {
                isPrivate: isPrivate ? false : true,
            },
        });

        if (data) {
            await createUserCookie(data.updateUserVisibility);
            setUser(data.updateUserVisibility);

            isPrivate
                ? setMessage(
                      "Your content is now accessible to all, except for the posts you've chosen to keep hidden.",
                  )
                : setMessage("From now on, you're a part of the shadows.");
        }
    };

    useEffect(() => {
        new AuthService().getUser(setUser);
    }, []);

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <main className="flex items-center justify-center w-full h-screen">
                <div className="h-3/4 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 h-full rounded-lg shadow-lg bg-gray-900">
                        <h1 className="font-bold text-2xl mb-4 text-white">
                            <MdManageAccounts className="inline-block" /> Account
                        </h1>
                    </div>
                    <div className="p-4 h-full overflow-y-scroll rounded-lg shadow-lg bg-gray-900">
                        <h1 className="font-bold text-2xl mb-4 text-white">
                            <RxActivityLog className="inline-block" /> Activity
                        </h1>
                        <ol className="relative border-s ml-5 border-[#cc00ff]">
                            {userActivityLog &&
                                userActivityLog.findActivities.map((activity: any) => (
                                    <li key={activity.id} className="mb-2 ms-4">
                                        <div className="absolute w-3 h-3 bg-[#cc00ff] rounded-full mt-1.5 -start-1.5 border border-[#cc00ff]"></div>
                                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                            {formatDate(activity.createdAt)}
                                        </time>
                                        <h3 className="text-white">{activity.description}</h3>
                                    </li>
                                ))}
                        </ol>
                    </div>
                    <div className="p-4 h-full rounded-lg shadow-lg bg-gray-900">
                        <h1 className="font-bold text-2xl mb-4 text-white">
                            <MdOutlinePrivacyTip className="inline-block" /> Security
                        </h1>
                        {onlineInstances && (
                            <span className="p-2 bg-green-500/20 text-green-300 rounded-lg">
                                You are currently connected in <span className="font-bold">{onlineInstances.onlineInstances}</span>{' '}
                                different places
                            </span>
                        )}
                    </div>
                    <div className="p-4 h-full rounded-lg shadow-lg bg-gray-900">
                        <h1 className="font-bold text-2xl mb-4 text-white">
                            <PiSecurityCamera className="inline-block" /> Privacy
                        </h1>
                        <label className="inline-flex items-center cursor-pointer p-4 rounded-md bg-slate-800 hover:shadow-lg w-full">
                            <input
                                id="togglePrivateProfile"
                                type="checkbox"
                                value=""
                                checked={user.isPrivate}
                                className="sr-only peer"
                                onChange={() => togglePrivateProfile(user.isPrivate)}
                            />
                            <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#cc00ff] rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-[#cc00ff]"></div>
                            <span className="ms-3 text-sm font-medium text-gray-300">Make my profile private</span>
                        </label>
                        {message && (
                            <p className="text-sm text-center mt-2 font-medium text-green-300 rounded-lg bg-green-300/5 p-2">
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
