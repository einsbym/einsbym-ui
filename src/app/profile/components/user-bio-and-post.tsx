import PublishPost from "./publish-post";

export default function UserBioAndPost(props: { userId: string }) {
    return (
        <>
            {/* User's bio */}
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Bio</h5>
            <a
                href="#"
                className="block w-full p-6 border rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
                <p className="font-normal text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
                    order.
                </p>
            </a>

            {/* Publish post */}
            <PublishPost userId={props.userId} />
        </>
    );
}
