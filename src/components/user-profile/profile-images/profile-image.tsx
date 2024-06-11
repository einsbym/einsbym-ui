import { backend } from '@/constants/constants';
import { Dispatch, SetStateAction } from 'react';
import { FaCamera } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';

interface ProfileImageProps {
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
    loggedUserId?: string | null;
    setIsChangeProfPicActive: Dispatch<SetStateAction<boolean>>;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    firstName,
    lastName,
    username,
    profileImage,
    loggedUserId,
    setIsChangeProfPicActive,
}) => {
    return (
        <div className="absolute -bottom-[13rem] left-1/2 transform -translate-x-1/2 flex items-center justify-center flex-col">
            <div
                style={{
                    backgroundImage:
                        profileImage && profileImage ? `url('${backend.storageUrl + profileImage}')` : 'none',
                }}
                className="relative w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
            >
                {!loggedUserId && (
                    <div
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 p-2 lg:p-3 rounded-full lg:bottom-0 lg:left-auto lg:right-0 bg-gray-900 hover:bg-[#cc00ff] group transition-all duration-200 cursor-pointer"
                        onClick={() => setIsChangeProfPicActive(true)}
                    >
                        <FaCamera
                            className="text-[#cc00ff] group-hover:text-gray-900 text-lg"
                            title="Change profile image"
                        />
                    </div>
                )}
            </div>
            <div className="mt-5 md:mt-2 text-white font-sans text-center font-semibold text-2xl lg:text-3xl w-full">
                {firstName} {lastName}
            </div>
            <div className="w-full text-center text-md font-normal text-gray-400">@{username}</div>
            <div className="flex gap-1 items-center justify-center text-white mt-2 font-sans text-center font-semibold text-md w-full">
                <span className="text-[#cc00ff]">12k</span> followers <LuDot size={30} />
                <span className="text-[#cc00ff]">23</span> following
            </div>
        </div>
    );
};
