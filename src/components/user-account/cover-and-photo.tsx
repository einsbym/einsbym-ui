import { api } from '@/constants/constants';
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import UpdateProfileImage from './update-profile-image';

interface CoverAndPhotoProps {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    loggedUserId?: string | null;
}

export default function CoverAndPhoto(props: CoverAndPhotoProps) {
    const [isChangeProfPicActive, setIsChangeProfPicActive] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>('');

    useEffect(() => {
        if (props.profileImage) {
            setProfileImage(props.profileImage);
        }
    }, [props.profileImage]);

    return (
        <>
            <div className={`relative lg:w-4/5 h-[20rem] mx-auto lg:rounded-lg`}>
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
