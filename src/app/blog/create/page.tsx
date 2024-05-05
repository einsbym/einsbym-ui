'use client';

import dynamic from 'next/dynamic';

const CustomEditorJs = dynamic((): any => import('./custom-editorjs'));

export default function Create() {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-1/2 mt-10">
                <div className="w-full p-5 bg-gray-900 rounded-lg shadow-lg">Write your title</div>
                <CustomEditorJs/>
            </div>
        </div>
    );
}
