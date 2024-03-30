import { api } from '@/constants/constants';
import { usePathname } from 'next/navigation';

interface BlurredBackgroundProps {
    coverImage: string;
}

export default function BlurredBackground(props: BlurredBackgroundProps) {
    const pathname = usePathname();

    return (
        <div
            style={{
                backgroundImage: props.coverImage
                    ? `linear-gradient(to bottom, transparent, black), url('${api.storageUrl}/${props.coverImage}')`
                    : 'none',
            }}
            className="absolute left-0 top-0 h-screen w-full -z-10 bg-cover blur-sm bg-no-repeat bg-center bg-fixed overflow-hidden"
        >
            {pathname === '/profile' && (
                <div className="absolute bottom-0 bg-[#040d12] w-full h-60 rounded-t-[3rem] lg:rounded-t-[10rem] shadow-[0px_30px_90px_#cc00ff]"></div>
            )}
        </div>
    );
}
