interface UserBlurredCoverProps {
    coverImage: string;
}

export default function UserBlurredCover(props: UserBlurredCoverProps) {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to bottom, transparent, black), url('${props.coverImage}')`,
            }}
            className="absolute left-0 top-0 h-4/5 w-full -z-10 bg-contain bg-cover blur-sm bg-no-repeat bg-fixed"
        ></div>
    );
}
