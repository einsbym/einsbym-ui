import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import ReactPlayer from 'react-player';

export default function GallerySideViewer(props: {
    isFileViewerActive: boolean;
    setIsFileViewerActive: Dispatch<SetStateAction<boolean>>;
    selectedFile: any;
}) {
    const viewerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (viewerRef.current && !viewerRef.current.contains(event.target as Node)) {
                props.setIsFileViewerActive(false);
            }
        },
        [viewerRef, props],
    );

    useEffect(() => {
        // Add event listener on document click when menu is open
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove listener on unmount
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [props.isFileViewerActive, handleClickOutside]);

    return (
        <div
            ref={viewerRef}
            className={`fixed top-0 right-0 z-40 w-full lg:rounded-l-[2rem] lg:w-1/2 h-screen flex justify-center items-center p-4 overflow-y-auto ${
                props.isFileViewerActive ? null : 'translate-x-full'
            } transition-transform backdrop-blur-lg bg-opacity-10 z-10 bg-black/30`}
        >
            <IoIosArrowForward
                className="absolute z-10 top-5 lg:top-auto left-5 bg-[#cc00ff1e] text-[#cc00ff] p-2 cursor-pointer mb-2"
                onClick={() => props.setIsFileViewerActive(false)}
                size={40}
            />
            {props.selectedFile && props.selectedFile.fileExtension !== 'mp4' && (
                <img
                    alt={props.selectedFile.url}
                    className="rounded-lg h-full object-contain"
                    src={props.selectedFile.url}
                />
            )}
            {props.selectedFile && props.selectedFile.fileExtension === 'mp4' && (
                <ReactPlayer
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
                    url={props.selectedFile.url}
                    controls
                    playing={props.isFileViewerActive}
                    stopOnUnmount
                    light={false}
                />
            )}
        </div>
    );
}
