import { backend } from '@/constants/constants';
import { CommentType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { FaRegHeart } from 'react-icons/fa';

export default function Comment(props: { comment: CommentType }) {
    if (props.comment) {
        return (
            <div className="w-full text-sm text-white p-3 my-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-base font-semibold leading-none text-white">
                        <a href={`/profile/${props.comment.user.username}`}>
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={backend.storageUrl + props.comment.user.profilePicture}
                                alt={props.comment.user.firstName}
                            />
                        </a>
                        <div className="flex flex-col">
                            <span className="hover:underline text-sm font-normal">{props.comment.user.username}</span>
                            <span className="text-xs font-normal text-gray-400">
                                {getElapsedTime(props.comment.createdAt)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="text-white bg-[#040d12] hover:bg-[#cc00ff] hover:text-[#040d12] focus:ring-2 focus:ring-[#cc00ff] rounded-full p-1 focus:outline-none"
                        >
                            <FaRegHeart />
                        </button>
                    </div>
                </div>
                <p className="mt-2">{props.comment.comment}</p>
            </div>
        );
    }
}
