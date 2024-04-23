import { backend } from '@/constants/constants';
import { CommentType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';

export default function Reply(props: { comment: CommentType }) {
    return (
        <div className="flex flex-col items-end">
            <div className="flex flex-col w-11/12 overflow-hidden break-word p-4 border-l-2 border-l-[#cc00ff]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <a href={`/profile/${props.comment.user.username}`}>
                        <img
                            className="flex-none w-[30px] h-[30px] lg:w-[30px] lg:h-[30px] rounded-full object-cover"
                            src={backend.storageUrl + props.comment.user.profilePicture}
                            alt={props.comment.user.username}
                        />
                    </a>
                    <span className="text-sm font-semibold text-white">{props.comment.user.username}</span>
                    <span className="text-[10px] lg:text-sm font-normal text-gray-400">
                        {getElapsedTime(props.comment.createdAt)}
                    </span>
                </div>

                <p className="text-sm font-normal py-2.5 text-white">{props.comment.comment}</p>
            </div>
        </div>
    );
}
