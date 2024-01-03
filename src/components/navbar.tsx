'use client';

import { useState } from 'react';

const menuItems = [
    { id: 1, label: 'Gallery', slug: '/' },
    { id: 2, label: 'Upload', slug: '/upload' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

    const handleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
        setIsMenuOpen(true);
    };

    return (
        <>
            <nav className="mb-10">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                                    <img className="h-8 w-auto" src="/icon.png" />
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
                                    <button
                                        type="button"
                                        className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#cc00ff] focus:ring-offset-2 focus:ring-offset-gray-800"
                                        id="user-menu-button"
                                        onClick={() => handleMenu()}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src="/profpic.jpeg" alt="" />
                                    </button>
                                </div>
                                <div
                                    className={
                                        !isMenuOpen
                                            ? 'hidden'
                                            : 'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                    }
                                    role="menu"
                                    tabIndex={-1}
                                >
                                    <a
                                        href="/app"
                                        className="block px-4 py-2 text-sm text-[#cc00ff69] hover:text-[#cc00ff]"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-[#cc00ff69] hover:text-[#cc00ff]"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-1"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-[#cc00ff69] hover:text-[#cc00ff]"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-2"
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
            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto ${
                    isSidebarActive ? null : '-translate-x-full'
                } transition-transform bg-white dark:bg-gray-900`}
                aria-labelledby="drawer-navigation-label"
            >
                <h5
                    id="drawer-navigation-label"
                    className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                >
                    Menu
                </h5>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-[#cc00ff1e] hover:text-[#cc00ff] rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
                    onClick={() => setIsSidebarActive(false)}
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e] dark:hover:bg-[#cc00ff1e] group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 transition duration-75 text-[#cc00ff] dark:text-[#cc00ff]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 18"
                                >
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Gallery</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e] dark:hover:bg-[#cc00ff1e] group"
                            >
                                <svg
                                    className="w-5 h-5 text-[#cc00ff]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Upload</span>
                                <span className="inline-flex items-center justify-center w-10 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-lg dark:bg-blue-900 dark:text-white">
                                    new
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
