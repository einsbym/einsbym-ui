import { storageUrl } from '@/constants/constants';
import { User } from '@/interfaces/interfaces';
import { AuthService } from '@/services/auth-config';
import { useRouter } from 'next/navigation';
import { RiLoginCircleLine } from 'react-icons/ri';

interface SidebarProps {
    user: User | null;
    isMenuOpen: boolean;
    handleMenu: any;
}

export default function NavbarUserPopover(props: SidebarProps) {
    const router = useRouter();

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
                        {storageUrl && (
                            <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={storageUrl + props.user.profilePicture}
                            />
                        )}
                    </button>
                )}
                {!props.user && (
                    <a href="/auth/login">
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
                        : 'absolute right-0 pt-2 pb-2 mt-5 w-48 origin-top-right rounded-md py-1 backdrop-filter backdrop-blur-lg bg-opacity-10 z-10 bg-black/30'
                }
            >
                {props.user && (
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        id="user-menu-item-0"
                    >
                        {props.user.firstName} ({props.user.username})
                    </a>
                )}
                <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                    id="user-menu-item-0"
                >
                    Your Profile
                </a>
                <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                    id="user-menu-item-1"
                >
                    Settings
                </a>
                <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                    onClick={signOut}
                >
                    Sign out
                </a>
            </div>
        </div>
    );
}
