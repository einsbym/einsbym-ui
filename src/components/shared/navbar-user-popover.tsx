import { AuthService } from '@/auth/auth.service';
import { api } from '@/constants/constants';
import { UserType } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import UpdateCoverImage from '../user-profile/update-cover-image';

interface SidebarProps {
    user: UserType | null;
    isMenuOpen: boolean;
    handleMenu: any;
}

export default function NavbarUserPopover(props: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [isChangeCoverImageActive, setIsChangeCoverImageActive] = useState<boolean>(false);

    const signOut = async () => {
        await new AuthService().signOut(router);
    };

    return (
        <div className="relative ml-3">
            <div>
                {props.user && (
                    <button
                        type="button"
                        className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#cc00ff] focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        onClick={() => props.handleMenu()}
                    >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        {api.storageUrl && (
                            <img
                                alt={props.user.profilePicture}
                                className="h-8 w-8 rounded-full object-cover"
                                src={api.storageUrl + props.user.profilePicture}
                            />
                        )}
                    </button>
                )}
                {!props.user && (
                    <a href="/auth/signin">
                        <div className="h-8 w-8 rounded-full cursor-pointer text-[#cc00ff]">
                            <RiLoginCircleLine size={32} />
                        </div>
                    </a>
                )}
            </div>
            <div
                className={
                    !props.isMenuOpen
                        ? 'hidden'
                        : 'absolute right-0 pt-2 pb-2 mt-5 w-48 origin-top-right rounded-md py-1 backdrop-blur-lg bg-opacity-10 z-10 bg-black/30'
                }
            >
                {props.user && (
                    <p className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]">
                        {props.user.firstName} ({props.user.username})
                    </p>
                )}
                <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                    id="user-menu-item-0"
                >
                    Your Profile
                </a>
                {pathname === '/profile' && (
                    <p
                        className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e] cursor-pointer"
                        onClick={() => setIsChangeCoverImageActive(true)}
                    >
                        Change cover image
                    </p>
                )}
                <p
                    className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e] cursor-pointer"
                    onClick={signOut}
                >
                    Sign out
                </p>
            </div>

            {/* Show menu for changing the cover image */}
            {props.user && (
                <UpdateCoverImage
                    userId={props.user.id}
                    currentCoverImage={props.user.coverImage}
                    isChangeCoverImageActive={isChangeCoverImageActive}
                    setIsChangeCoverImageActive={setIsChangeCoverImageActive}
                />
            )}
        </div>
    );
}
