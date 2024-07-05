import { ChangeEvent, useRef, useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropImageProps {
    handleFileChange: (file: File) => void;
}

export const CropImage: React.FC<CropImageProps> = ({ handleFileChange }) => {
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: 'px',
        x: 0,
        y: 0,
        width: 50,
        height: 50,
    });
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const fileUrlRef = useRef<string | null>(null);

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setSrc(reader.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

            // Save original image for cover/profile on no crop
            handleFileChange(e.target.files[0]);
        }
    };

    const onImageLoaded = (image: HTMLImageElement) => {
        imageRef.current = image;
        return false;
    };

    const onCropComplete = (crop: Crop) => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop: Crop) => {
        setCrop(crop);
    };

    const makeClientCrop = async (crop: Crop) => {
        if (imageRef.current && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(imageRef.current, crop, 'newFile.jpeg');
            setCroppedImageUrl(croppedImageUrl);
        }
    };

    const getCroppedImg = (image: HTMLImageElement, crop: Crop, fileName: string): Promise<string> => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height,
            );
        }

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error('Canvas is empty');
                        return;
                    }
                    const file = new File([blob], fileName, { type: 'image/jpeg' });

                    if (fileUrlRef.current) {
                        window.URL.revokeObjectURL(fileUrlRef.current);
                    }

                    const fileUrl = window.URL.createObjectURL(file);

                    fileUrlRef.current = fileUrl;

                    handleFileChange(file);
                    resolve(fileUrl);
                },
                'image/jpeg',
                1,
            );
        });
    };

    return (
        <div className="p-4 md:p-5 space-y-4">
            <label
                className="block mb-2 text-sm mx-auto w-fit font-medium text-white cursor-pointer"
                htmlFor="fileInput"
            >
                <MdOutlineCloudUpload className="hover:text-[#cc00ff] text-5xl" />
            </label>

            <input className="hidden" id="fileInput" type="file" onChange={onSelectFile} />

            <div className="grid grid-cols-2 gap-1">
                {src && (
                    <ReactCrop
                        crop={crop}
                        minWidth={50}
                        minHeight={50}
                        ruleOfThirds
                        onComplete={onCropComplete}
                        onChange={onCropChange}
                        className="w-full rounded-lg"
                    >
                        <img
                            alt="Selected Image"
                            src={src}
                            onLoad={(e) => onImageLoaded(e.currentTarget)}
                            className="w-full rounded-lg"
                        />
                    </ReactCrop>
                )}
                {croppedImageUrl && <img alt="Crop" className="w-full rounded-lg" src={croppedImageUrl} />}
            </div>
        </div>
    );
};

export default CropImage;
