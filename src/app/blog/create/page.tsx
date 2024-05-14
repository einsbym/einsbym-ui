'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const CustomEditorJs: any = dynamic((): any => import('./custom-editorjs'), { ssr: false });

export default function Create() {
    const [data, setData] = useState<any[]>([]);

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-1/2 mt-10">
                <input
                    className="p-5 w-full bg-gray-900 rounded-lg shadow-lg focus:outline-none placeholder:text-gray-600"
                    type="text"
                    placeholder="Title"
                />
                <div id="editorjs" className="mt-5 p-5 bg-gray-900 rounded-lg shadow-lg">
                    <CustomEditorJs setData={setData} />
                </div>
            </div>
            <div className="w-[700px] mt-10 ml-5 bg-gray-900 p-5">
                {data.map((block) => (
                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}></p>
                ))}
            </div>
        </div>
    );
}
