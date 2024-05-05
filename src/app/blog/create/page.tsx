'use client';

import dynamic from 'next/dynamic';

const CustomEditorJs = dynamic((): any => import('./custom-editorjs'), { ssr: false });

export default function Create() {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-1/2 mt-10">
                <div id="editorjs" className="p-5 bg-gray-900 rounded-lg shadow-lg">
                    <CustomEditorJs />
                </div>
            </div>
        </div>
    );
}
