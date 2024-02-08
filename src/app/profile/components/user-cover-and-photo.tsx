import { storageUrl } from '@/app/constants/constants';
import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import UpdateProfilePictureModal from './update-profile-pic-modal';

interface UserCoverAndPhotoProps {
    firstName: string;
    lastName: string;
    coverImage: string;
    profileImage: string;
}

export default function UserCoverAndPhoto(props: UserCoverAndPhotoProps) {
    const [isChangeProfPicModalActive, setIsChangeProfPicModalActive] = useState<boolean>(false);

    return (
        <>
            <div
                style={{ backgroundImage: `url('${storageUrl}/${props.coverImage}')` }}
                className="relative lg:w-4/5 h-[20rem] mx-auto lg:rounded-lg bg-cover bg-center"
            >
                <div
                    style={{
                        backgroundImage: `url('${storageUrl}/${props.profileImage}')`,
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-[-30px] top-1/2 left-1/2 w-[15rem] h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
                >
                    <div
                        className="absolute bottom-3 right-3 text-[#cc00ff] cursor-pointer"
                        title="Change profile image"
                        onClick={() => setIsChangeProfPicModalActive(true)}
                    >
                        <FaCamera size={40} />
                    </div>
                </div>
            </div>
            <div className="mt-[8rem] text-white font-sans text-center font-semibold text-3xl w-fit mx-auto rounded-lg">
                {props.firstName} {props.lastName}
            </div>
            <div className="flex gap-1 items-center justify-center text-white mt-2 font-sans text-center font-semibold text-md w-fit mx-auto rounded-lg">
                <span className="text-[#cc00ff]">12k</span> likes <LuDot size={30} />
                <span className="text-[#cc00ff]">23</span> images <LuDot size={30} />
                <span className="text-[#cc00ff]">125k</span> views
            </div>

            {/* Chande profile picture modal */}
            <UpdateProfilePictureModal
                isChangeProfPicModalActive={isChangeProfPicModalActive}
                setIsChangeProfPicModalActive={setIsChangeProfPicModalActive}
            />
        </>
    );
}
