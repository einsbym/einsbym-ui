import { IoMdCloseCircle } from "react-icons/io";

interface SelectedFilesPreviewProps {
    selectedFiles: { filename: string; blob?: string }[];
    removeFileFromList: (index: number) => void;
}

export const SelectedFilesPreview: React.FC<SelectedFilesPreviewProps> = ({ selectedFiles, removeFileFromList }) => (
    <div className="mt-2">
        <p className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg text-sm">
            Selected files: {selectedFiles.length}
        </p>
        <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
            {selectedFiles.map((file, index) => (
                <div
                    style={{ backgroundImage: `url(${file.blob})` }}
                    className="relative w-auto h-40 rounded-lg bg-center bg-cover"
                    key={index}
                >
                    <button
                        className="absolute top-2 right-2 text-[#cc00ff]"
                        type="button"
                        onClick={() => removeFileFromList(index)}
                    >
                        <IoMdCloseCircle size={20} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);
