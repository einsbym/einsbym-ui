'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const CustomEditorJs: any = dynamic((): any => import('./custom-editorjs'), { ssr: false });

export default function Create() {
    const [title, setTitle] = useState<string>();
    const [data, setData] = useState<any[]>([]);

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-1/3 mt-10">
                <input
                    id="title"
                    className="p-5 w-full bg-gray-900 rounded-lg shadow-lg focus:outline-none placeholder:text-gray-600"
                    type="text"
                    placeholder="Title"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <div id="editorjs" className="mt-5 p-5 bg-gray-900 rounded-lg shadow-lg">
                    <CustomEditorJs setData={setData} />
                </div>
            </div>
            <div className="w-1/2 mt-10 ml-5 bg-gray-900 p-5 rounded-lg shadow-lg border border-[#cc00ff]">
                {title && <h1 className="text-5xl text-md mb-5 font-mono">{title}</h1>}
                {data.map((block) => (
                    <p
                        key={block.id}
                        className="mb-2 font-serif"
                        dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                    ></p>
                ))}
            </div>
        </div>
    );
}
