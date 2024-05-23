'use client';

import Preview from '@/components/blog/preview';
import Navbar from '@/components/shared/navbar';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const TextEditor: any = dynamic((): any => import('./text-editor'), { ssr: false });

export default function Create() {
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [data, setData] = useState<any[]>([]);

    return (
        <>
            <Navbar />
            <div className="w-full flex items-center justify-center">
                <div className="w-1/3 mt-20">
                    <input
                        id="title"
                        className="p-5 w-full bg-gray-900 rounded-lg shadow-lg focus:outline-none placeholder:text-gray-600"
                        type="text"
                        placeholder="Title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        id="description"
                        className="mt-2 p-5 w-full bg-gray-900 rounded-lg shadow-lg focus:outline-none placeholder:text-gray-600"
                        placeholder="Description"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <div id="editorjs" className="mt-2 p-5 bg-gray-900 rounded-lg shadow-lg">
                        <TextEditor setData={setData} />
                    </div>
                </div>
                <Preview title={title} description={description} data={data} />
            </div>
        </>
    );
}
