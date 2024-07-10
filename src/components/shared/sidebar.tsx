import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { FaRegNewspaper, FaVideo } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { RiGalleryView2 } from 'react-icons/ri';

interface SidebarProps {
    isSidebarActive: boolean;
    setIsSidebarActive: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar(props: SidebarProps) {
    const viewerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (viewerRef.current && !viewerRef.current.contains(event.target as Node)) {
                props.setIsSidebarActive(false);
            }
        },
        [viewerRef, props],
    );

    useEffect(() => {
        // Add event listener on document click when menu is open
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove listener on unmount
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [props.isSidebarActive, handleClickOutside]);
    
    return (
        <div
            ref={viewerRef}
            id="drawer-navigation"
            className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto ${
                props.isSidebarActive ? null : '-translate-x-full'
            } transition-transform backdrop-blur-lg bg-opacity-10 z-10 bg-black/30`}
        >
            <h5 id="drawer-navigation-label" className="text-base font-semibold uppercase text-white">
                Menu
            </h5>
            <button
                type="button"
                className="text-white hover:bg-[#cc00ff1e] hover:text-[#cc00ff] rounded-lg p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
                onClick={() => props.setIsSidebarActive(false)}
            >
                <IoIosArrowBack className='text-lg' />
                <span className="sr-only">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-1 font-medium">
                    <li>
                        <a
                            href="/"
                            className="flex items-center gap-2 p-2 rounded-lg text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        >
                            <RiGalleryView2 /> Gallery
                        </a>
                    </li>
                    <li>
                        <a
                            href="/videos"
                            className="flex items-center gap-2 p-2 rounded-lg text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        >
                            <FaVideo /> Videos
                        </a>
                    </li>
                    <li>
                        <a
                            href="/blog"
                            className="flex items-center gap-2 p-2 rounded-lg text-white hover:text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        >
                            <FaRegNewspaper /> Blog
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
