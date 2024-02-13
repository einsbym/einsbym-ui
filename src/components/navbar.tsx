'use client';

import { storageUrl } from '@/constants/constants';
import { User } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import Sidebar from './sidebar';
import { useRouter } from 'next/navigation';
import { deleteCookies, getCurrentUserFromCookie } from '@/actions/cookies';

const menuItems = [
    { id: 1, label: 'Gallery', slug: '/' },
    { id: 2, label: 'Upload', slug: '/upload' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>();
    const router = useRouter();

    const handleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
        setIsMenuOpen(true);
    };

    const signOut = async () => {
        await deleteCookies();
        router.push(`/auth/login`);
    };

    const fetchUser = async () => {
        const user = await getCurrentUserFromCookie();
        setUser(user);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <nav className="mb-10">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#cc00ff1e] hover:text-[#cc00ff] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#cc00ff]"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => setIsSidebarActive(true)}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    className="hidden h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="/">
                                    <img className="h-8 w-auto" src="/icon.svg" />
                                </a>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.slug}
                                            className="hover:bg-[#cc00ff1e] text-[#cc00ff] rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="relative rounded-full bg-[#cc00ff1e] p-1 text-[#cc00ff] focus:outline-none focus:ring-2 focus:ring-[#cc00ff] focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>

                            <div className="relative ml-3">
                                <div>
                                    {user && (
                                        <button
                                            type="button"
                                            className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#cc00ff] focus:ring-offset-2 focus:ring-offset-gray-800"
                                            id="user-menu-button"
                                            onClick={() => handleMenu()}
                                        >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            {storageUrl && (
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={storageUrl + user.profilePicture}
                                                />
                                            )}
                                        </button>
                                    )}
                                    {!user && (
                                        <a href="/auth/login">
                                            <div className="h-8 w-8 rounded-full cursor-pointer text-[#cc00ff]">
                                                <RiLoginCircleLine size={32} />
                                            </div>
                                        </a>
                                    )}
                                </div>
                                <div
                                    className={
                                        !isMenuOpen
                                            ? 'hidden'
                                            : 'absolute right-0 z-10 pt-2 pb-2 mt-3 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                    }
                                    role="menu"
                                    tabIndex={-1}
                                >
                                    {user && (
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                                            role="menuitem"
                                            tabIndex={-1}
                                            id="user-menu-item-0"
                                        >
                                            {user.firstName} ({user.username})
                                        </a>
                                    )}
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-1"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-[#cc00ff] hover:bg-[#cc00ff1e]"
                                        onClick={() => signOut()}
                                    >
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <Sidebar isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
        </>
    );
}
