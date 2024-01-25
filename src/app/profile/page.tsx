'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { LuDot } from 'react-icons/lu';

export default function ViewImage() {
    return (
        <>
            <main className="border border-red-600 mx-auto lg:pt-12">
                <Navbar />
                <div
                    style={{ backgroundImage: `url('http://localhost:9000/einsbym-uploads/gvhvmbbjbkb.jpeg')` }}
                    className="relative lg:w-4/5 h-[20rem] mx-auto border border-yellow-600 lg:rounded-lg bg-cover bg-center"
                >
                    <div
                        style={{
                            backgroundImage: `url('http://localhost:9000/einsbym-uploads/33cf81d1-079d-4505-8c61-c0835c8ebb14.jpeg')`,
                        }}
                        className="absolute transform -translate-x-1/2 -translate-y-[-30px] top-1/2 left-1/2 w-[15rem] h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
                    ></div>
                </div>
                <div className="mt-[8rem] text-white font-sans text-center font-semibold text-3xl w-fit mx-auto border border-yellow-600 rounded-lg">
                    Bianca Mendes
                </div>
                <div className="flex gap-1 items-center justify-center text-white mt-2 font-sans text-center font-semibold text-md w-fit mx-auto border border-yellow-600 rounded-lg">
                    <span className="text-[#cc00ff]">12k</span> likes <LuDot size={30} />
                    <span className="text-[#cc00ff]">23</span> images <LuDot size={30} />
                    <span className="text-[#cc00ff]">125k</span> views
                </div>
                <div className="lg:w-4/5 mx-auto mt-5 border rounded-lg shadow bg-gray-800 border-gray-700">
                    <ul
                        className="text-sm font-medium text-center divide-x divide-gray-200 sm:flex divide-gray-600 text-gray-400 rtl:divide-x-reverse"
                        id="fullWidthTab"
                    >
                        <li className="w-full">
                            <button
                                id="stats-tab"
                                type="button"
                                role="tab"
                                className="inline-block w-full p-4 rounded-ss-lg rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none bg-gray-700 hover:bg-gray-600"
                            >
                                Statistics
                            </button>
                        </li>
                    </ul>
                    <div id="fullWidthTabContent" className="border-t border-gray-200 border-gray-600">
                        <div className="p-4 rounded-lg md:p-8 bg-gray-800" id="stats">
                            <div className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-3 xl:p-2 xl:grid-cols-6 text-white sm:p-8">
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">2º</dt>
                                    <dd className="text-gray-400">Creators ranking</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">83%</dt>
                                    <dd className="text-gray-400">Engagement this month</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">2k</dt>
                                    <dd className="text-gray-400">Given likes</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">2k</dt>
                                    <dd className="text-gray-400">Comments</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">235</dt>
                                    <dd className="text-gray-400">Posts</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                                    <dd className="text-gray-400">Pageviews this month</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-4/5 h-[20rem] border border-yellow-600 mx-auto mt-5"></div>

                <Footer />
            </main>
        </>
    );
}
