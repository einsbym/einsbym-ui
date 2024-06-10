import { AuthService } from '@/auth/auth.service';
import { UserType } from '@/types/types';
import { useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import NavbarUserPopover from './navbar-user-popover';
import Sidebar from './sidebar';

const menuItems = [
    { id: 1, label: 'Gallery', slug: '/' },
    { id: 2, label: 'Videos', slug: '/videos' },
    { id: 3, label: 'Blog', slug: '/blog' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>();

    const handleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
        setIsMenuOpen(true);
    };

    useEffect(() => {
        new AuthService().getUser(setUser);
    }, []);

    return (
        <>
            <nav className="fixed inset-x-0 top-0 w-full z-10">
                <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

                <div className="px-5 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex items-center sm:hidden">
                            <button
                                type="button"
                                className="rounded-md text-white hover:bg-[#cc00ff1e] hover:text-[#cc00ff] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#cc00ff]"
                                onClick={() => setIsSidebarActive(true)}
                            >
                                <RxHamburgerMenu className="text-lg" />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="hidden lg:flex items-center">
                                <a href="/">
                                    <img alt="Navbar Icon" className="h-8 w-auto" src="/icon.svg" />
                                </a>
                            </div>
                            <div className="hidden ml-2 lg:block">
                                <div className="flex space-x-2">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.slug}
                                            className="hover:bg-[#cc00ff1e] text-[#cc00ff] rounded-md p-2 text-sm font-medium"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="rounded-full bg-[#cc00ff1e] p-2 text-[#cc00ff]"
                            >
                                <IoIosNotificationsOutline className='text-xl' />
                            </button>

                            <NavbarUserPopover isMenuOpen={isMenuOpen} handleMenu={handleMenu} user={user || null} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <Sidebar isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
        </>
    );
}
