import { PostType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

interface EditProps {
    post: PostType;
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const Edit: React.FC<EditProps> = ({ post, setIsEditModalOpen }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] bg-gray-900 z-30 rounded-lg shadow-lg p-5">
            <form>
                <textarea
                    id="bio"
                    name="bio"
                    className="resize-y rounded-md w-full bg-transparent placeholder-gray-400 text-white outline-none"
                    placeholder="Write your thoughts here..."
                    defaultValue={post.postText}
                />
                <div className="flex gap-2 justify-end mt-2 w-full">
                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase font-bold rounded-lg shadow-lg text-center px-2 py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                    >
                        cancel
                    </button>
                    <button
                        type="submit"
                        className="flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase font-bold rounded-lg shadow-lg text-center px-2 py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                    >
                        save
                    </button>
                </div>
            </form>
        </div>
    );
};
