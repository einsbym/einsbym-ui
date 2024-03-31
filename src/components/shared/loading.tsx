import { AiOutlineLoading } from 'react-icons/ai';

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <AiOutlineLoading className="w-28 h-28 text-transparent animate-spin fill-[#cc00ff]" />
        </div>
    );
}
