import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import UpdateProfileImage from './update-profile-image';
import UpdateCoverImage from './update-cover-image';
import { api } from '@/constants/constants';

interface UserCoverAndPhotoProps {
    id: string;
    firstName: string;
    lastName: string;
    coverImage: string;
    profileImage: string;
    loggedUserId?: string | null;
}

export default function UserCoverAndPhoto(props: UserCoverAndPhotoProps) {
    const [isChangeProfPicActive, setIsChangeProfPicActive] = useState<boolean>(false);
    const [isChangeCoverImageActive, setIsChangeCoverImageActive] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>('');
    const [coverImage, setCoverImage] = useState<string>('');

    useEffect(() => {
        if (props.coverImage) {
            setCoverImage(props.coverImage);
        }

        if (props.profileImage) {
            setProfileImage(props.profileImage);
        }
    }, [props.profileImage, props.coverImage]);

    return (
        <>
            <div className={`relative lg:w-4/5 h-[20rem] mx-auto lg:rounded-lg`}>
                {!props.loggedUserId && (
                    <FaCamera
                        className="absolute bottom-3 right-3 text-[#cc00ff] cursor-pointer"
                        title="Change cover image"
                        onClick={() => setIsChangeCoverImageActive(true)}
                        size={30}
                    />
                )}
                <div
                    style={{
                        backgroundImage:
                            props.profileImage && profileImage ? `url('${api.storageUrl + profileImage}')` : 'none',
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-[-30px] top-1/2 left-1/2 w-[15rem] h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
                >
                    {!props.loggedUserId && (
                        <FaCamera
                            className="absolute bottom-3 right-3 text-[#cc00ff] cursor-pointer"
                            title="Change profile image"
                            onClick={() => setIsChangeProfPicActive(true)}
                            size={30}
                        />
                    )}
                </div>
            </div>
            <div className="mt-[8rem] text-white font-sans text-center font-semibold text-2xl lg:text-3xl w-fit mx-auto rounded-lg">
                {props.firstName} {props.lastName}
            </div>
            <div className="flex gap-1 items-center justify-center text-white mt-2 font-sans text-center font-semibold text-md w-fit mx-auto rounded-lg">
                <span className="text-[#cc00ff]">12k</span> likes <LuDot size={30} />
                <span className="text-[#cc00ff]">23</span> images <LuDot size={30} />
                <span className="text-[#cc00ff]">125k</span> views
            </div>

            {/* Show menu for changing the cover image */}
            <UpdateCoverImage
                userId={props.id}
                currentCoverImage={coverImage}
                isChangeCoverImageActive={isChangeCoverImageActive}
                setIsChangeCoverImageActive={setIsChangeCoverImageActive}
                setCoverImage={setCoverImage}
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
