import { useRouter } from 'next/navigation';
import { GoStop } from 'react-icons/go';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Forbidden(props: { title: string; message: string }) {
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-5">
            <p className="flex items-center gap-2 text-4xl font-bold text-[#cc00ff]">
                <GoStop /> {props.title}
            </p>
            <p className="text-gray-600"> {props.message}</p>
            <button
                id="saveBtn"
                type="button"
                className="flex gap-2 items-center justify-center w-fit border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black uppercase font-bold rounded-lg shadow-lg text-center p-2 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                onClick={() => router.push('/profile', { scroll: false })}
            >
                <IoMdArrowRoundBack /> you better move along
            </button>
        </div>
    );
}
