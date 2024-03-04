import { storageUrl } from '@/constants/constants';

interface UserBlurredCoverProps {
    coverImage: string;
}

export default function UserBlurredCover(props: UserBlurredCoverProps) {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to bottom, transparent, black), url('${storageUrl}/${props.coverImage}')`,
            }}
            className="absolute left-0 top-0 h-screen rounded-b-[2rem] lg:rounded-b-[10rem] w-full -z-10 bg-contain bg-cover blur-sm bg-no-repeat bg-center bg-fixed"
        ></div>
    );
}
