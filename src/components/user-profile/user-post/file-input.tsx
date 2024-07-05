import { ChangeEvent } from 'react';
import { GrGallery } from 'react-icons/gr';

interface FileInputProps {
    onFilesChange: (event: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({ onFilesChange, loading }) => (
    <>
        <label
            className="text-white absolute end-12 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2 cursor-pointer"
            htmlFor="fileInput"
            title="Select images"
        >
            <GrGallery size={20} />
        </label>
        <input
            multiple={true}
            className="hidden"
            id="fileInput"
            type="file"
            onChange={onFilesChange}
            disabled={loading}
        />
    </>
);
