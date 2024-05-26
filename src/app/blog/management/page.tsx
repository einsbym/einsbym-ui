'use client';

import Preview from '@/components/blog/preview';
import Navbar from '@/components/shared/navbar';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const TextEditor: any = dynamic((): any => import('./text-editor'), { ssr: false });

export interface StatusMessage {
    status: string;
    message: string;
}

export default function Create() {
    const [statusMessage, setStatusMessage] = useState<StatusMessage>();
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
                    <div className="relative">
                        <div id="editorjs" className="relative mt-2 p-5 bg-gray-900 rounded-lg shadow-lg">
                            <TextEditor
                                title={title}
                                description={description}
                                setData={setData}
                                setStatusMessage={setStatusMessage}
                            />
                        </div>
                        <div
                            className={`absolute left-0 ${
                                statusMessage !== undefined ? '-bottom-10' : 'bottom-0'
                            } w-full px-0 pb-2 pt-5 rounded-b-lg ${
                                statusMessage && statusMessage.status === 'success'
                                    ? 'bg-green-950/60 text-green-300 text-center'
                                    : 'bg-red-950/60 text-red-300'
                            } text-center -z-10 transition-all duration-200`}
                            onClick={() => setStatusMessage(undefined)}
                        >
                            {statusMessage?.message}
                        </div>
                    </div>
                </div>
                <Preview title={title} description={description} data={data} />
            </div>
        </>
    );
}
