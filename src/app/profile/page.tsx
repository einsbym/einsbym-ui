'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { FiSend } from 'react-icons/fi';
import { LuDot } from 'react-icons/lu';
import { MdPostAdd } from 'react-icons/md';

export default function ViewImage() {
    return (
        <>
            <main className="mx-auto lg:pt-12">
                <Navbar />
                <div
                    style={{ backgroundImage: `url('http://localhost:9000/einsbym-uploads/gvhvmbbjbkb.jpeg')` }}
                    className="relative lg:w-4/5 h-[20rem] mx-auto lg:rounded-lg bg-cover bg-center"
                >
                    <div
                        style={{
                            backgroundImage: `url('http://localhost:9000/stable-diffusion/sjhdhdidj.jpeg')`,
                        }}
                        className="absolute transform -translate-x-1/2 -translate-y-[-30px] top-1/2 left-1/2 w-[15rem] h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
                    ></div>
                </div>
                <div className="mt-[8rem] text-white font-sans text-center font-semibold text-3xl w-fit mx-auto rounded-lg">
                    Bianca Mendes
                </div>
                <div className="flex gap-1 items-center justify-center text-white mt-2 font-sans text-center font-semibold text-md w-fit mx-auto rounded-lg">
                    <span className="text-[#cc00ff]">12k</span> likes <LuDot size={30} />
                    <span className="text-[#cc00ff]">23</span> images <LuDot size={30} />
                    <span className="text-[#cc00ff]">125k</span> views
                </div>

                {/* General statistics */}
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

                {/* User's content */}
                <div className="grid grid-cols-2 gap-2 lg:w-4/5 border border-yellow-600 mx-auto mt-5">
                    {/* User's bio and posts */}
                    <div className="border border-blue-600">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Bio</h5>
                        <a
                            href="#"
                            className="block w-full p-6 border rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700"
                        >
                            <p className="font-normal text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </a>

                        {/* Publish post */}
                        <div className='mt-5'>
                            <form>
                                <label htmlFor="search" className="mb-2 text-sm font-medium sr-only text-white">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <MdPostAdd size={30} color="white" />
                                    </div>
                                    <input
                                        type="post"
                                        id="post"
                                        className="block w-full p-4 ps-[3rem] text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write something..."
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="text-white absolute end-2.5 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2"
                                    >
                                        <FiSend size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* User images gallery */}
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Gallery</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </>
    );
}
