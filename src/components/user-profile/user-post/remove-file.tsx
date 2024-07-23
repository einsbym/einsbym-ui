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
            className="flex items-center justify-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-red-950/60 text-red-300"
            onClick={() => handleClickRemove(file.id)}
        >
            <MdDelete /> remove image
        </div>
    );
};
