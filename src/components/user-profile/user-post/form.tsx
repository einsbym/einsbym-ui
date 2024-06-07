import { ChangeEvent, FormEvent } from 'react';
import { FiSend } from 'react-icons/fi';
import { FileInput } from './file-input';

interface PostFormProps {
    postText: string | null | undefined;
    setPostText: (text: string | null) => void;
    handleSubmit: (event: FormEvent) => void;
    handleFilesChange: (event: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({
    postText,
    setPostText,
    handleSubmit,
    loading,
    handleFilesChange,
}) => (
    <form>
        <div className="relative">
            <textarea
                id="post"
                className="block w-full h-40 p-4 resize-none text-sm rounded-lg bg-gray-900 placeholder-gray-400 text-white focus:outline-none focus:border-2 focus:border-[#cc00ff]"
                placeholder="Write something..."
                value={postText || ''}
                onChange={(event) => setPostText(event.target.value)}
                required
            />
            <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2 disabled:text-gray-500"
                onClick={handleSubmit}
                disabled={loading}
            >
                <FiSend size={20} />
            </button>
            <FileInput onFilesChange={handleFilesChange} loading={loading} />
        </div>
    </form>
);
