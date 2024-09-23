import { REMOVE_FILE } from '@/graphql/mutations/file';
import { PostFileType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { Menu, rem } from '@mantine/core';
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
    const [removeFileMutation] = useMutation(REMOVE_FILE);

    const removeFile = async (id: string) => {
        try {
            await removeFileMutation({
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
        <Menu.Item
            leftSection={<MdDelete style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => removeFile(file.id)}
            color="#f03e3e"
            variant="light"
        >
            remove image
        </Menu.Item>
    );
};
