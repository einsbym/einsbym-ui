import { backend } from '@/constants/constants';
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import UpdateProfileImage from './update-profile-image';
import UpdateCoverImage from './update-cover-image';

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
                <div className="absolute -bottom-[13rem] left-1/2 transform -translate-x-1/2">
                    <div
                        style={{
                            backgroundImage:
                                props.profileImage && profileImage
                                    ? `url('${backend.storageUrl + profileImage}')`
                                    : 'none',
                        }}
                        className="relative w-[15rem] h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
                    >
                        {!props.loggedUserId && (
                            <div
                                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 p-2 lg:p-3 rounded-full lg:bottom-0 lg:left-auto lg:right-0 bg-gray-900 hover:bg-[#cc00ff] group transition-all duration-200 cursor-pointer"
                                onClick={() => setIsChangeProfPicActive(true)}
                            >
                                <FaCamera className="text-[#cc00ff] group-hover:text-gray-900 text-lg" title="Change profile image" />
                            </div>
                        )}
                    </div>
                    <div className="mt-2 text-white font-sans text-center font-semibold text-2xl lg:text-3xl w-full">
                        {props.firstName} {props.lastName}
                    </div>
                    <div className="w-full text-center text-md font-normal text-gray-400">@{props.username}</div>
                    <div className="flex gap-1 items-center justify-center text-white mt-2 font-sans text-center font-semibold text-md w-full">
                        <span className="text-[#cc00ff]">12k</span> followers <LuDot size={30} />
                        <span className="text-[#cc00ff]">125k</span> views
                    </div>
                </div>
                {!props.loggedUserId && (
                    <div
                        title="Change cover image"
                        className="absolute -bottom-5 right-5 transform flex items-center justify-center lg:gap-2 lg:px-3 lg:py-2 lg:bottom-3 lg:right-3 text-black bg-gray-900 rounded-full p-2 cursor-pointer hover:bg-[#cc00ff] group transition-all duration-200"
                        onClick={() => setIsChangeCoverImageActive(true)}
                    >
                        <FaCamera className="text-[#cc00ff] group-hover:text-gray-900 text-lg" />
                        <span className="hidden lg:block lg:text-sm text-[#cc00ff] group-hover:text-gray-900">Change cover image</span>
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
