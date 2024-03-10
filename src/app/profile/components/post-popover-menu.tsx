import { useState } from 'react';

export default function PostPopoverMenu() {
    // States
    const [isEditBioActive, setIsEditBioActive] = useState<boolean>(false);

    return (
        <div className="absolute right-0 bottom-[-130px] z-10 divide-y divide-gray-100 rounded-lg shadow w-44 backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
            <ul className="py-2 text-sm text-gray-200">
                <li>
                    <a href="#" className="block px-4 py-2 text-[#cc00ff] hover:bg-[#cc00ff1e]">
                        edit
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-[#cc00ff] hover:bg-[#cc00ff1e]">
                        change visibility
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-red-400">
                        delete
                    </a>
                </li>
            </ul>
        </div>
    );
}
