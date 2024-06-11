import { backend } from '@/constants/constants';
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { ProfileImage } from './profile-image';
import UpdateCoverImage from './update-cover-image';
import UpdateProfileImage from './update-profile-image';

interface CoverAndPhotoProps {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
    coverImage: string;
    loggedUserId?: string | null;
}

export default function CoverAndPhoto(props: CoverAndPhotoProps) {
    const [isChangeProfPicActive, setIsChangeProfPicActive] = useState<boolean>(false);
    const [isChangeCoverImageActive, setIsChangeCoverImageActive] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const [coverImage, setCoverImage] = useState<string>('');

    useEffect(() => {
        if (props.profileImage) {
            setProfileImage(props.profileImage);
        }

        if (props.coverImage) {
            setCoverImage(props.coverImage);
        }
    }, [props.profileImage, props.coverImage]);

    return (
        <>
            <div
                style={{
                    backgroundImage:
                        props.coverImage && coverImage
                            ? `linear-gradient(to bottom, transparent, black), url('${
                                  backend.storageUrl + coverImage
                              }')`
                            : 'none',
                }}
                className="relative w-full h-[30rem] lg:h-[40rem] mb-56 bg-cover bg-center"
            >
                <ProfileImage
                    firstName={props.firstName}
                    lastName={props.lastName}
                    profileImage={profileImage}
                    username={props.username}
                    setIsChangeProfPicActive={setIsChangeProfPicActive}
                    loggedUserId={props.loggedUserId}
                />

                {!props.loggedUserId && (
                    <div
                        title="Change cover image"
                        className="absolute -bottom-5 right-5 transform flex items-center justify-center lg:gap-2 lg:px-3 lg:py-2 lg:bottom-3 lg:right-3 text-black bg-gray-900 rounded-full p-2 cursor-pointer hover:bg-[#cc00ff] group transition-all duration-200"
                        onClick={() => setIsChangeCoverImageActive(true)}
                    >
                        <FaCamera className="text-[#cc00ff] group-hover:text-gray-900 text-lg" />
                        <span className="hidden lg:block lg:text-sm text-[#cc00ff] group-hover:text-gray-900">
                            Change cover image
                        </span>
                    </div>
                )}
            </div>

            {/* Show menu for changing the cover image */}
            <UpdateCoverImage
                userId={props.id}
                currentCoverImage={props.coverImage}
                isChangeCoverImageActive={isChangeCoverImageActive}
                setCoverImage={setCoverImage}
                setIsChangeCoverImageActive={setIsChangeCoverImageActive}
            />

            {/* Show menu for changing the profile picture */}
            <UpdateProfileImage
                userId={props.id}
                currentProfileImage={profileImage}
                isChangeProfPicActive={isChangeProfPicActive}
                setIsChangeProfPicActive={setIsChangeProfPicActive}
                setProfileImage={setProfileImage}
            />
        </>
    );
}
