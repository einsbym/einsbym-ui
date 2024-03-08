import getElapsedTime from '@/actions/elapsed-time';
import { storageUrl } from '@/constants/constants';
import { Post } from '@/interfaces/interfaces';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PostPopoverMenu from './post-popover-menu';
import PostLikeButton from './post-like-button';
import { FaRegCommentAlt, FaRegShareSquare } from 'react-icons/fa';
import PublishPostComment from './publish-post-comment';
import PostComments from './post-comments';
import { useState } from 'react';

export default function PostItem(props: { post: Post; userId: string }) {
    // States
    const [publishedPostCommentId, setPublishedPostCommentId] = useState<string>('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);

    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    return (
        <div key={props.post.id} className="mt-5 flex items-start gap-2">
            <img
                alt={props.post.user.username}
                className="flex-none w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                src={storageUrl + props.post.user.profilePicture}
            />
            <div className="flex flex-col w-full overflow-hidden break-words p-4 rounded-e-xl rounded-es-xl bg-gray-800">
                <div className="relative flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-white">
                            {props.post.user.firstName} {props.post.user.lastName}
                        </span>
                        <span className="ml-2 text-[12px] lg:text-sm font-normal text-gray-400">
                            {getElapsedTime(props.post.createdAt)}
                        </span>
                    </div>
                    <button className="text-white" type="button" onClick={handlePopoverToggle}>
                        <BsThreeDotsVertical />
                    </button>
                    {isPopoverOpen && <PostPopoverMenu />}
                </div>
                <p className="text-sm font-normal py-2.5 text-white">{props.post.postText}</p>

                {/* Display images (if any) */}
                {props.post.images.length > 0 && (
                    <div
                        className={`grid gap-2 ${props.post.images.length === 1 ? 'grid-cols-1' : null} ${
                            props.post.images.length > 4 ? 'grid-cols-4' : null
                        } ${
                            props.post.images.length > 1 && props.post.images.length <= 4 ? 'grid-cols-2' : null
                        } my-2.5`}
                    >
                        {props.post.images.map((image) => (
                            <div key={image.id} className="group relative">
                                <img
                                    alt={image.filename}
                                    src={storageUrl + image.filename}
                                    className={`w-full h-[200px] ${
                                        props.post.images.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                    } object-cover rounded-lg`}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-2 justify-end">
                    <PostLikeButton
                        postId={props.post.id}
                        liked={props.post.likes?.some((like) => like.id === props.userId)}
                        initialLikes={props.post.totalLikes}
                        userId={props.userId}
                    />
                    <button
                        className="flex items-center gap-2 text-sm lg:bg-gray-800 text-white rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200"
                        onClick={() => {
                            setAreCommentsVisible(!areCommentsVisible);
                        }}
                    >
                        <FaRegCommentAlt size={13} /> {props.post.totalComments}
                    </button>
                    <button className="flex items-center gap-2 text-sm lg:bg-gray-800 text-white rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200">
                        <FaRegShareSquare size={13} /> 0
                    </button>
                </div>

                <PublishPostComment
                    postId={props.post.id}
                    userId={props.userId}
                    setPublishedPostCommentId={setPublishedPostCommentId}
                    setAreCommentsVisible={setAreCommentsVisible}
                />

                {/* Conditionally render PostComments */}
                {areCommentsVisible && (
                    <PostComments postId={props.post.id} publishedPostCommentId={publishedPostCommentId} />
                )}
            </div>
        </div>
    );
}