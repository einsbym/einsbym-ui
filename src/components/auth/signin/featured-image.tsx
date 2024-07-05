import { backend } from "@/constants/constants";

interface FeaturedImageProps {
    data: any;
}

export const FeaturedImage: React.FC<FeaturedImageProps> = ({ data }: FeaturedImageProps) => {
    return (
        <div
            style={{
                backgroundImage: `url('${backend.storageUrl + data.findRandomFile.filename}')`,
            }}
            className="hidden relative md:block w-full h-full bg-cover bg-no-repeat bg-center"
        >
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <img
                    alt={data.findRandomFile.post.user.username}
                    className="flex-none w-[45px] h-[45px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                    src={backend.storageUrl + data.findRandomFile.post.user.profilePicture}
                />
                <span className="text-sm font-semibold text-white bg-[#0000003b] p-2 rounded-md">
                    {data.findRandomFile.post.user.username}
                </span>
            </div>
        </div>
    );
};
