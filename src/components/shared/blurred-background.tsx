import { api } from '@/constants/constants';

interface BlurredBackgroundProps {
    coverImage: string;
}

export default function BlurredBackground(props: BlurredBackgroundProps) {
    return (
        <div
            style={{
                backgroundImage: props.coverImage
                    ? `linear-gradient(to bottom, transparent, black), url('${api.storageUrl}/${props.coverImage}')`
                    : 'none',
            }}
            className="absolute left-0 top-0 h-screen w-full -z-10 bg-cover blur-sm bg-no-repeat bg-center bg-fixed overflow-hidden"
        ></div>
    );
}
