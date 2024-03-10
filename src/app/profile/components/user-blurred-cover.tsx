import { storageUrl } from '@/constants/constants';

interface UserBlurredCoverProps {
    coverImage: string;
}

export default function UserBlurredCover(props: UserBlurredCoverProps) {
    return (
        <div
            style={{
                backgroundImage: props.coverImage
                    ? `linear-gradient(to bottom, transparent, black), url('${storageUrl}/${props.coverImage}')`
                    : 'none',
            }}
            className="absolute left-0 top-0 h-screen w-full -z-10 bg-cover blur-sm bg-no-repeat bg-center bg-fixed"
        ></div>
    );
}
