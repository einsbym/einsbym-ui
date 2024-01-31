'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { FaCamera, FaRegCommentAlt, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { LuDot } from 'react-icons/lu';
import { MdPostAdd } from 'react-icons/md';

export default function ViewImage() {
    return (
        <>
            <main className="mx-auto lg:pt-12">
                <Navbar />
                <div
                    style={{ backgroundImage: `url('#')` }}
                    className="relative lg:w-4/5 h-[20rem] mx-auto lg:rounded-lg bg-cover bg-center"
                >
                    <div
                        style={{
                            backgroundImage: `url('#')`,
                        }}
                        className="absolute transform -translate-x-1/2 -translate-y-[-30px] top-1/2 left-1/2 w-[15rem] h-[15rem] rounded-full bg-cover bg-center shadow-2xl"
                    >
                        <div className='absolute bottom-3 right-3 text-[#cc00ff] cursor-pointer' title='Change profile image'><FaCamera size={40} /></div>
                    </div>
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
                <div className="w-11/12 lg:w-4/5 mx-auto mt-5 border rounded-lg shadow bg-gray-800 border-gray-700">
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
                                    <dd className="text-gray-400">Month's engagement</dd>
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
                <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                    {/* User's bio and posts */}
                    <div>
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
                        <div className="mt-5">
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

                        {/* Text only posts */}
                        <div className="mt-5 flex items-start gap-2.5">
                            <img
                                className="w-[60px] h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                                src="#"
                                alt="Jese image"
                            />
                            <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-white">Bonnie Green</span>
                                    <span className="text-sm font-normal text-gray-400">11:46</span>
                                </div>
                                <p className="text-sm font-normal py-2.5 text-white">
                                    That's awesome. I think our users will really appreciate the improvements.
                                </p>
                                <div className="flex space-x-2 justify-end">
                                    <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                        <FaRegHeart size={13} /> 232
                                    </button>
                                    <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                        <FaRegCommentAlt size={13} /> 1.5k
                                    </button>
                                    <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                        <FaRegShareSquare size={13} /> 0
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Text and image posts */}
                        <div className="mt-5 flex items-start gap-2.5">
                            <img
                                className="w-[60px] h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                                src="#"
                                alt="Jese image"
                            />
                            <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-white">Bonnie Green</span>
                                    <span className="text-sm font-normal text-gray-400">11:46</span>
                                </div>
                                <p className="text-sm font-normal py-2.5 text-white">
                                    That's awesome. I think our users will really appreciate the improvements.
                                </p>
                                <div className="group relative my-2.5">
                                    <img
                                        src="#"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="flex space-x-2 justify-end">
                                    <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                        <FaRegHeart size={13} /> 232
                                    </button>
                                    <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                        <FaRegCommentAlt size={13} /> 1.5k
                                    </button>
                                    <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                        <FaRegShareSquare size={13} /> 0
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User images gallery */}
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Gallery</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div>
                                <img
                                    className="h-[200px] w-[300px] rounded-lg object-cover"
                                    src="#"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-[200px] w-[300px] rounded-lg object-cover"
                                    src="#"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-[200px] w-[300px] rounded-lg object-cover"
                                    src="#"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-[200px] w-[300px] rounded-lg object-cover"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-[200px] w-[300px] rounded-lg object-cover"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-[200px] w-[300px] rounded-lg object-cover"
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
