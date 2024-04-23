import { backend } from '@/constants/constants';
import { CommentType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { FaRegCommentAlt, FaRegHeart } from 'react-icons/fa';
import Replies from './replies';
import { useState } from 'react';

export default function Comment(props: { comment: CommentType }) {
    const [areRepliesVisible, setAreRepliesVisible] = useState<boolean>(false);

    return (
        <div key={props.comment.id} className="mt-3 lg:mt-5">
            <div className="flex flex-col w-full overflow-hidden break-word p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-800">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <a href={`/profile/${props.comment.user.username}`}>
                        <img
                            className="flex-none w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full object-cover"
                            src={backend.storageUrl + props.comment.user.profilePicture}
                            alt={props.comment.user.username}
                        />
                    </a>
                    <span className="text-sm font-semibold text-white">{props.comment.user.firstName}</span>
                    <span className="text-[10px] lg:text-sm font-normal text-gray-400">
                        {getElapsedTime(props.comment.createdAt)}
                    </span>
                </div>

                <p className="text-sm font-normal py-2.5 text-white">{props.comment.comment}</p>

                <div className="flex gap-2 justify-end">
                    <button className="flex items-center gap-1 lg:gap-2 text-sm lg:bg-gray-900 text-white lg:rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200">
                        <FaRegHeart size={13} /> 232
                    </button>
                    <button
                        className="flex items-center gap-1 lg:gap-2 text-sm lg:bg-gray-900 text-white lg:rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200"
                        onClick={() => setAreRepliesVisible(!areRepliesVisible)}
                    >
                        <FaRegCommentAlt size={13} /> {props.comment.totalResponses}
                    </button>
                </div>
            </div>

            {areRepliesVisible && <Replies key={props.comment.id} commentId={props.comment.id} />}
        </div>
    );
}
