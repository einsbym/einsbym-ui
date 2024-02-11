import { storageUrl } from '@/app/constants/constants';
import { FIND_POSTS_BY_USER } from '@/graphql/queries/post';
import { useQuery } from '@apollo/client';
import { FaRegCommentAlt, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';

export default function UserPosts(props: { userId: string }) {
    const { data } = useQuery(FIND_POSTS_BY_USER, {
        variables: {
            userId: props.userId
        }
    });

    return (
        <>
            {/* Text only posts */}
            {data?.findPostsByUser.map((post: any) => (
                <div key={post.id} className="mt-5 flex items-start gap-2.5">
                    <img
                        className="w-[60px] h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                        src={`${storageUrl}/${post.user.profilePicture}`}
                        alt={post.user.username}
                    />
                    <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-white">{post.user.firstName} {post.user.lastName}</span>
                            <span className="text-sm font-normal text-gray-400">11:46</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-white">
                            {post.postText}
                        </p>
                        <div className="flex space-x-2 justify-end">
                            <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                <FaRegHeart size={13} /> 232
                            </button>
                            <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                <FaRegCommentAlt size={13} /> 1.5k
                            </button>
                            <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                <FaRegShareSquare size={13} /> 0
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Text and image posts */}
            <div className="mt-5 flex items-start gap-2.5">
                <img
                    className="w-[60px] h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                    src="#"
                    alt="Jese image"
                />
                <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-white">Bonnie Green</span>
                        <span className="text-sm font-normal text-gray-400">11:46</span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-white">
                        That's awesome. I think our users will really appreciate the improvements.
                    </p>
                    <div className="group relative my-2.5">
                        <img src="#" className="rounded-lg" />
                    </div>
                    <div className="flex space-x-2 justify-end">
                        <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                            <FaRegHeart size={13} /> 232
                        </button>
                        <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                            <FaRegCommentAlt size={13} /> 1.5k
                        </button>
                        <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                            <FaRegShareSquare size={13} /> 0
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
