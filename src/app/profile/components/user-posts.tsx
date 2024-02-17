import { storageUrl } from '@/constants/constants';
import { FIND_POSTS_BY_USER } from '@/graphql/queries/post';
import { Post } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { FaRegCommentAlt, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';

export default function UserPosts(props: { userId: string; posts: Post[] }) {
    let posts = props.posts;

    if (posts.length === 0) {
        const { data } = useQuery(FIND_POSTS_BY_USER, {
            variables: {
                userId: props.userId,
            },
            fetchPolicy: 'no-cache',
        });

        posts = data?.findPostsByUser;
    }

    return (
        <>
            {posts?.map((post: Post) => (
                <div key={post.id} className="mt-5 flex items-start gap-2">
                    <img
                        className="flex-none w-[60px] h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                        src={storageUrl + post.user.profilePicture}
                        alt={post.user.username}
                    />
                    <div className="flex flex-col w-full overflow-hidden break-all p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-white">
                                {post.user.firstName} {post.user.lastName}
                            </span>
                            <span className="text-sm font-normal text-gray-400">11:46</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-white">{post.postText}</p>

                        {/* Display images (if any) */}
                        {post.images.length > 0 && (
                            <div className="grid gap-2 grid-cols-2 my-2.5">
                                {post.images.map((image) => (
                                    <div key={image.id} className="group relative">
                                        <img src={storageUrl + image.filename} className="w-full h-[200px] lg:h-[500px] object-cover rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        )}

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
        </>
    );
}
