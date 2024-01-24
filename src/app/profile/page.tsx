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
                <div className="mt-[8rem] font-sans text-center font-semibold text-3xl w-fit mx-auto border border-yellow-600 rounded-lg">
                    Bianca Mendes
                </div>
                <div className="flex gap-1 items-center justify-center mt-2 font-sans text-center font-semibold text-md w-fit mx-auto border border-yellow-600 rounded-lg">
                    <span className="text-[#cc00ff]">12k</span> likes <LuDot size={30} />
                    <span className="text-[#cc00ff]">23</span> images <LuDot size={30} />
                    <span className="text-[#cc00ff]">125k</span> views
                </div>

                <Footer />
            </main>
        </>
    );
}
