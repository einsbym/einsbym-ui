import { useState } from 'react';
import PublishPost from './publish-post';
import { useQuery } from '@apollo/client';

export default function UserBioAndPost(props: { userId: string }) {
    // States
    const [isEditBioActive, setIsEditBioActive] = useState<boolean>(false);

    return (
        <>
            {/* User's bio */}
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Bio</h5>
            <div
                className="block w-full p-6 border rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => setIsEditBioActive(true)}
            >
                <p className="font-normal text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
                    order.
                </p>
            </div>

            <div
                className={`fixed bottom-0 left-0 z-10 rounded-t-lg w-full p-5 ${
                    isEditBioActive ? null : 'translate-y-full'
                } transition-transform bg-gray-900`}
            >
                <form>
                    <textarea
                        className="block p-2.5 w-full h-[10rem] text-sm rounded-lg border bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                    />
                    <div className="flex gap-2 justify-end mt-2 w-full">
                        <button type="button" onClick={() => setIsEditBioActive(false)} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-cyan-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                cancel
                            </span>
                        </button>
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                save
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Publish post */}
            <PublishPost userId={props.userId} />
        </>
    );
}
