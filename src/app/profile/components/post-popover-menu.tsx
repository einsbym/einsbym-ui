import { useState } from 'react';

export default function PostPopoverMenu() {
    // States
    const [isEditBioActive, setIsEditBioActive] = useState<boolean>(false);

    return (
        <div className="absolute right-0 bottom-[-130px] z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700">
            <ul className="py-2 text-sm text-gray-200">
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                        edit
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                        change visibility
                    </a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                        delete
                    </a>
                </li>
            </ul>
        </div>
    );
}
