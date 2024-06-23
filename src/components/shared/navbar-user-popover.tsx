import { AuthService } from '@/auth/auth.service';
import { backend } from '@/constants/constants';
import { UserType } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaRegNewspaper } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { IoIosSettings } from 'react-icons/io';
import { RiLoginCircleLine } from 'react-icons/ri';

interface SidebarProps {
    user: UserType | null;
}

export default function NavbarUserPopover(props: SidebarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
        setIsMenuOpen(true);
    };

    const signOut = async () => {
        await new AuthService().signOut(router);
    };

    return (
        <div className="relative">
            <div>
                {props.user && (
                    <button
                        type="button"
                        className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#cc00ff] focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        onClick={() => handleMenu()}
                    >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        {backend.storageUrl && (
                            <img
                                alt={props.user.profilePicture}
                                className="h-8 w-8 rounded-full object-cover"
                                src={backend.storageUrl + props.user.profilePicture}
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

            {isMenuOpen && (
                <div className="absolute right-0 p-2 mt-5 w-48 origin-top-right rounded-md z-10 bg-gray-900">
                    {props.user && (
                        <p className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]">
                            {props.user.firstName} ({props.user.username})
                        </p>
                    )}
                    <a
                        href="/profile"
                        className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                    >
                        <CgProfile /> Your Profile
                    </a>
                    {props.user && props.user.role === 'admin' && (
                        <a
                            href="/blog/management"
                            className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        >
                           <FaRegNewspaper /> Manage blog
                        </a>
                    )}
                    {pathname === '/profile' && (
                        <a
                            href="/profile/settings"
                            className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        >
                            <IoIosSettings /> Your settings
                        </a>
                    )}
                    <p
                        className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e] cursor-pointer"
                        onClick={signOut}
                    >
                        <GoSignOut /> Sign out
                    </p>
                </div>
            )}
        </div>
    );
}
