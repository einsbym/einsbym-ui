import { backend } from '@/constants/constants';
import { PostType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegCommentAlt, FaRegShareSquare } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import PostPopoverMenu from '../post-popover-menu';
import LikePostButton from './like-post-button';
import PublishComment from '../publish-comment';
import Comments from '../comments';

export default function Post(props: { post: PostType; userId: string; loggedUserId?: string | null }) {
    // States
    const [publishedCommentId, setPublishedCommentId] = useState<string>('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);
    const [removed, setRemoved] = useState(false);

    return (
        <div key={props.post.id} className={removed ? 'hidden' : 'mt-5 flex items-start gap-2'}>
            <a className="flex-none" href={`/profile/${props.post.user.username}`}>
                <img
                    alt={props.post.user.username}
                    className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                    src={backend.storageUrl + props.post.user.profilePicture}
                />
            </a>
            <div className="flex flex-col w-full break-words p-4 rounded-e-xl rounded-es-xl bg-gray-900">
                <div className="relative flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-white">
                            {props.post.user.firstName} {props.post.user.lastName}
                        </span>
                        <span className="ml-2 text-[12px] lg:text-sm font-normal text-gray-400">
                            {getElapsedTime(props.post.createdAt)}
                        </span>
                    </div>
                    <button className="text-white hover:text-[#cc00ff]" type="button" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                        <BsThreeDotsVertical />
                    </button>
                    {isPopoverOpen && (
                        <PostPopoverMenu
                            postId={props.post.id}
                            setRemoved={setRemoved}
                            loggedUserId={props.loggedUserId}
                        />
                    )}
                </div>
                <p className="text-sm font-normal py-2.5 text-white">{props.post.postText}</p>

                {/* Display files (if any) */}
                {props.post.files.length > 0 && (
                    <div
                        className={`grid gap-2 ${props.post.files.length === 1 ? 'grid-cols-1' : null} ${
                            props.post.files.length > 4 ? 'grid-cols-4' : null
                        } ${
                            props.post.files.length > 1 && props.post.files.length <= 4 ? 'grid-cols-2' : null
                        } my-2.5`}
                    >
                        {props.post.files.map((file) => (
                            <div key={file.id} className="group relative">
                                {file.fileType === 'video/mp4' && (
                                    <div className="w-full rounded-lg">
                                        <ReactPlayer
                                            width="100%"
                                            height="100%"
                                            style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
                                            url={backend.storageUrl + file.filename}
                                            playing
                                            muted
                                            light={false}
                                        />
                                    </div>
                                )}
                                {file.fileType !== 'video/mp4' && (
                                    <img
                                        alt={file.filename}
                                        src={backend.storageUrl + file.filename}
                                        className={`w-full h-[200px] ${
                                            props.post.files.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                        } object-cover rounded-lg`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-2 justify-end">
                    <LikePostButton
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
                {areCommentsVisible && (
                    <Comments postId={props.post.id} publishedCommentId={publishedCommentId} />
                )}
            </div>
        </div>
    );
}
