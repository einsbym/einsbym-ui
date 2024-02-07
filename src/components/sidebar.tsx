'use client';


export default function Sidebar(props: any) {
    return (
        <div
            id="drawer-navigation"
            className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto ${
                props.isSidebarActive ? null : '-translate-x-full'
            } transition-transform bg-gray-900`}
            aria-labelledby="drawer-navigation-label"
        >
            <h5
                id="drawer-navigation-label"
                className="text-base font-semibold uppercase text-gray-400"
            >
                Menu
            </h5>
            <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-[#cc00ff1e] hover:text-[#cc00ff] rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
                onClick={() => props.setIsSidebarActive(false)}
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
                            href="/"
                            className="flex items-center p-2 rounded-lg text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e] group"
                        >
                            <svg
                                className="flex-shrink-0 w-5 h-5 transition duration-75 text-[#cc00ff]"
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
                            href="/upload"
                            className="flex items-center p-2 rounded-lg text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e] group"
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
                            <span className="inline-flex items-center justify-center w-10 h-3 p-3 ms-3 text-sm font-medium rounded-lg bg-blue-900 text-white">
                                new
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
