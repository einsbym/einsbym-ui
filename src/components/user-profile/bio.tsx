import { createUserCookie } from '@/auth/cookies';
import { UPDATE_BIO } from '@/graphql/mutations/user';
import { ME } from '@/graphql/queries/user';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosSave } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';

export default function UserBio(props: { userId: string; bio: string; loggedUserId?: string | null }) {
    // States
    const [isEditBioActive, setIsEditBioActive] = useState<boolean>(false);
    const [bio, setBio] = useState<string>();
    const [currentBio, setCurrentBio] = useState<string>();
    const [updatedBio, setUpdatedBio] = useState<string>();

    // Queries
    const [getMe] = useLazyQuery(ME);

    // Mutations
    const [updateBio] = useMutation(UPDATE_BIO);

    const handleSave = async (event: any) => {
        event.preventDefault();

        try {
            if (bio) {
                // Save post
                const { data, errors } = await updateBio({
                    variables: {
                        updateBioInput: {
                            bio: bio,
                        },
                    },
                });

                if (errors) {
                    throw new Error('Error when attempting to update your bio.');
                }

                setUpdatedBio(data.updateBio.bio);
                setCurrentBio(data.updateBio.bio);

                // Update user cookie with the new data
                await getMe({ variables: { id: props.userId } }).then(async (result) => {
                    await createUserCookie(result.data.me);
                });

                setIsEditBioActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* User's bio */}
            <div className="flex items-center justify-between mb-2 text-lg lg:text-2xl font-bold tracking-tight text-white">
                About{' '}
                <FaRegEdit
                    className="cursor-pointer text-base hover:text-[#cc00ff]"
                    onClick={() => {
                        !props.loggedUserId ? setIsEditBioActive(true) : null;
                        setCurrentBio(props.bio);
                    }}
                />
            </div>
            <div className="relative block w-full p-6 rounded-lg shadow bg-gray-900 hover:bg-gray-800">
                <p className="font-normal text-gray-400">{updatedBio || props.bio}</p>
            </div>

            {isEditBioActive && (
                <div className={`mt-2 rounded-lg w-full p-5 bg-gray-900`}>
                    <form>
                        <textarea
                            id="bio"
                            name="bio"
                            className="resize-y rounded-md w-full bg-transparent placeholder-gray-400 text-white outline-none"
                            placeholder="Write your thoughts here..."
                            defaultValue={currentBio}
                            onChange={(event) => setBio(event.target.value)}
                        />
                        <div className="flex gap-2 justify-end mt-2 w-full">
                            <button
                                type="button"
                                onClick={() => setIsEditBioActive(false)}
                                className="w-full border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase rounded-lg shadow-lg text-center py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                            >
                                cancel
                            </button>
                            <button
                                type="submit"
                                onClick={(event) => {
                                    handleSave(event);
                                }}
                                className="w-full border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase rounded-lg shadow-lg text-center py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                            >
                                save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
