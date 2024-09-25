import { createUserCookie } from '@/auth/cookies';
import { UPDATE_BIO } from '@/graphql/mutations/user';
import { ME } from '@/graphql/queries/user';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Popover, Textarea } from '@mantine/core';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

export default function UserBio(props: { userId: string; bio: string; loggedUserId?: string | null }) {
    // States
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
                {!props.loggedUserId && (
                    <Popover position="bottom" width={300} radius={8} withArrow shadow="md">
                        <Popover.Target>
                            <Button variant="transparent" color="white" p={0}>
                                <FaRegEdit className="text-base hover:text-[#cc00ff]" />
                            </Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Textarea
                                placeholder="Write your bio here..."
                                defaultValue={updatedBio || props.bio}
                                onChange={(event) => setBio(event.target.value)}
                            />

                            <Button
                                type="button"
                                mt={10}
                                w="100%"
                                color="#cc00ff"
                                variant="light"
                                onClick={(event) => {
                                    handleSave(event);
                                }}
                            >
                                save
                            </Button>
                        </Popover.Dropdown>
                    </Popover>
                )}
            </div>
            <div className="relative block w-full p-6 rounded-lg shadow bg-gray-900 hover:bg-gray-800">
                <p className="font-normal text-gray-400">{updatedBio || props.bio}</p>
            </div>
        </>
    );
}
