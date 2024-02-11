import { FiSend } from 'react-icons/fi';
import { MdPostAdd } from 'react-icons/md';

export default function PublishPost() {
    return (
        <div className="mt-5">
            <form>
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
    );
}
