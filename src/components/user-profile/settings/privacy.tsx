import { createUserCookie } from '@/auth/cookies';
import { UPDATE_USER_VISIBILITY } from '@/graphql/mutations/user';
import { UserType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { PiSecurityCamera } from 'react-icons/pi';

interface PrivacyProps {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType | null | undefined>>;
}

export const Privacy: React.FC<PrivacyProps> = ({ user, setUser }) => {
    const [message, setMessage] = useState<string | null>();

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

    return (
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
    );
};
