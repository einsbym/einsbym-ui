import { backend } from '@/constants/constants';
import { PostType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegCommentAlt, FaRegShareSquare } from 'react-icons/fa';
import Comments from '../comments';
import PublishComment from '../publish-comment';
import { DisplayFiles } from './display-files';
import { Edit } from './edit';
import LikeButton from './like-button';
import PostPopoverMenu from './post-popover-menu';

export default function Post(props: { post: PostType; userId: string; loggedUserId?: string | null }) {
    // States
    const [publishedCommentId, setPublishedCommentId] = useState<string>('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [post, setPost] = useState<PostType>();

    return (
        !removed && (
            <div key={props.post.id} className="mt-5 flex items-start gap-2">
                <a className="flex-none" href={`/profile/${props.post.user.username}`}>
                    <img
                        alt={props.post.user.username}
                        className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                        src={backend.storageUrl + props.post.user.profilePicture}
                    />
                </a>
                <div className="relative flex flex-col w-full break-words p-4 rounded-e-xl rounded-es-xl bg-gray-900">
                    {isEditModalOpen && (
                        <Edit post={props.post} setIsEditModalOpen={setIsEditModalOpen} setPost={setPost} />
                    )}

                    <div className="relative flex justify-between items-center">
                        <div>
                            <span className="text-sm font-semibold text-white">
                                {props.post.user.firstName} {props.post.user.lastName}
                            </span>
                            <span className="ml-2 text-[12px] lg:text-sm font-normal text-gray-400">
                                {getElapsedTime(props.post.createdAt)}{' '}
                                {props.post.createdAt !== props.post.updatedAt && (
                                    <span className="font-bold" title={getElapsedTime(props.post.updatedAt)}>· edited</span>
                                )}
                            </span>
                        </div>
                        <button
                            className="text-white hover:text-[#cc00ff]"
                            type="button"
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        >
                            <BsThreeDotsVertical />
                        </button>
                        {isPopoverOpen && (
                            <PostPopoverMenu
                                postId={props.post.id}
                                loggedUserId={props.loggedUserId}
                                setRemoved={setRemoved}
                                setIsEditModalOpen={setIsEditModalOpen}
                                setIsPopoverOpen={setIsPopoverOpen}
                            />
                        )}
                    </div>
                    <p className="text-sm font-normal py-2.5 text-white">
                        {(post && post.postText) || props.post.postText}
                    </p>

                    {/* Display files (if any) */}
                    {props.post.files.length > 0 && <DisplayFiles files={props.post.files} loggedUserId={props.loggedUserId} />}

                    <div className="flex gap-2 justify-end">
                        <LikeButton
                            postId={props.post.id}
                            liked={props.post.likes?.some((like) =>
                                props.loggedUserId ? like.id === props.loggedUserId : like.id === props.userId,
                            )}
                            initialLikes={props.post.totalLikes}
                            likes={props.post.likes}
                        />
                        <button
                            className="flex items-center gap-2 text-sm lg:bg-gray-900 text-white rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200"
                            onClick={() => {
                                setAreCommentsVisible(!areCommentsVisible);
                            }}
                        >
                            <FaRegCommentAlt size={13} /> {props.post.totalComments}
                        </button>
                        <button className="flex items-center gap-2 text-sm lg:bg-gray-900 text-white rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200">
                            <FaRegShareSquare size={13} /> 0
                        </button>
                    </div>

                    <PublishComment
                        postId={props.post.id}
                        setPublishedPostCommentId={setPublishedCommentId}
                        setAreCommentsVisible={setAreCommentsVisible}
                    />

                    {/* Conditionally render PostComments */}
                    {areCommentsVisible && <Comments postId={props.post.id} publishedCommentId={publishedCommentId} />}
                </div>
            </div>
        )
    );
}
