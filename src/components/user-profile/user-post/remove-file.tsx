import { REMOVE_FILE } from '@/graphql/mutations/file';
import { PostFileType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { MdDelete } from 'react-icons/md';

interface RemoveFileProps {
    file: PostFileType;
    files: PostFileType[];
    currentFiles: PostFileType[];
    setCurrentFiles: Dispatch<SetStateAction<PostFileType[]>>;
}

export const RemoveFile: React.FC<RemoveFileProps> = ({ file, files, currentFiles, setCurrentFiles }) => {
    // Mutations
    const [removeFile] = useMutation(REMOVE_FILE);

    const handleClickRemove = async (id: string) => {
        try {
            await removeFile({
                variables: {
                    removeFileId: id,
                },
            });

            // Optimistically update the UI
            setCurrentFiles(currentFiles.filter((file) => file.id !== id));
        } catch (error) {
            console.error(error);

            // Revert the UI update if the mutation fails
            setCurrentFiles(files);
        }
    };

    return (
        <div
            className="absolute p-2 rounded-full bottom-5 right-5 cursor-pointer text-xl bg-[#cc00ff] hover:bg-black text-black hover:text-[#cc00ff] transition-all duration-200"
            onClick={() => handleClickRemove(file.id)}
        >
            <MdDelete />
        </div>
    );
};
