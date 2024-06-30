'use client';

import { getCurrentUserFromCookie } from '@/auth/cookies';
import Preview from '@/components/blog/preview';
import Forbidden from '@/components/shared/forbidden';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { UserType } from '@/types/types';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { TagInput } from './tags-input';

const TextEditor: any = dynamic((): any => import('./text-editor'), { ssr: false });

export interface StatusMessage {
    status: string;
    message: string;
}

export default function Create() {
    const [statusMessage, setStatusMessage] = useState<StatusMessage>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [loggedUser, setLoggedUser] = useState<UserType | null>();

    // Check if the current user is an admin
    const checkUserPrivileges = useCallback(async () => {
        const userFromCookie = await getCurrentUserFromCookie();

        if (userFromCookie) {
            setLoggedUser(userFromCookie);
        }
    }, []);

    useEffect(() => {
        checkUserPrivileges();
    }, [checkUserPrivileges]);

    if (loggedUser && loggedUser.role !== 'admin') {
        return (
            <Forbidden
                title="YOU ARE NOT ALLOWED HERE!"
                message="This is a resource intended for users with admin privileges, so... yeah, get out!"
            />
        );
    }

    if (!loggedUser) {
        return <Loading />;
    }

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
                    <TagInput tags={tags} setTags={setTags} />
                    <div className="relative">
                        <div id="editorjs" className="relative mt-2 p-5 bg-gray-900 rounded-lg shadow-lg">
                            <TextEditor
                                title={title}
                                description={description}
                                tags={tags}
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
