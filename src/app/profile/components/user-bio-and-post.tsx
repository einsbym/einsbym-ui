import { UPDATE_BIO } from '@/graphql/mutations/user';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import PublishPost from './publish-post';
import { createUserCookie } from '@/actions/cookies';
import { ME } from '@/graphql/queries/user';

export default function UserBioAndPost(props: { userId: string; bio: string }) {
    // States
    const [isEditBioActive, setIsEditBioActive] = useState<boolean>(false);
    const [bio, setBio] = useState<string>();
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
                            userId: props.userId,
                            bio: bio,
                        },
                    },
                });

                if (errors) {
                    throw new Error('Error when attempting to update your bio.');
                }

                setUpdatedBio(data.updateBio.bio);

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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Bio</h5>
            <div
                className="block w-full p-6 border rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => setIsEditBioActive(true)}
            >
                <p className="font-normal text-gray-400">{updatedBio || props.bio}</p>
            </div>

            <div
                className={`fixed bottom-0 left-0 z-10 rounded-t-lg w-full p-5 ${
                    isEditBioActive ? null : 'translate-y-full'
                } transition-transform bg-gray-900`}
            >
                <form>
                    <textarea
                        id="bio"
                        name="bio"
                        className="block p-2.5 w-full h-[10rem] text-sm bg-transparent placeholder-gray-400 text-white outline-none resize-none"
                        placeholder="Write your thoughts here..."
                        onChange={(event) => setBio(event.target.value)}
                    />
                    <div className="flex gap-2 justify-end mt-2 w-full">
                        <button
                            type="button"
                            onClick={() => setIsEditBioActive(false)}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-cyan-800"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                cancel
                            </span>
                        </button>
                        <button
                            type="submit"
                            onClick={(event) => {
                                handleSave(event);
                            }}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                save
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Publish post */}
            <PublishPost userId={props.userId} />
        </>
    );
}
