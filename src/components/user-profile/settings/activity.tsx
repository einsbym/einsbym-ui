import { FIND_ACTIVITIES } from '@/graphql/queries/user';
import { formatDate } from '@/utils/formatted-date';
import { useQuery } from '@apollo/client';
import { RxActivityLog } from 'react-icons/rx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export const Activity: React.FC = () => {
    const { data: userActivityLog } = useQuery(FIND_ACTIVITIES);

    return (
        <div className="p-4 h-full overflow-hidden rounded-lg shadow-lg bg-gray-900">
            <PerfectScrollbar
                options={{ wheelSpeed: 1, wheelPropagation: true, minScrollbarLength: 20 }}
                style={{ left: 0 }}
            >
                <h1 className="font-bold text-2xl mb-4 text-white">
                    <RxActivityLog className="inline-block" /> Activity
                </h1>
                <ol className="relative border-s ml-5 border-[#cc00ff]">
                    {userActivityLog &&
                        userActivityLog.findActivities.map((activity: any) => (
                            <li key={activity.id} className="mb-2 ms-4">
                                <div className="absolute w-3 h-3 bg-[#cc00ff] rounded-full mt-1.5 -start-1.5 border border-[#cc00ff]"></div>
                                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                    {formatDate(activity.createdAt)}
                                </time>
                                <h3 className="text-white">{activity.description}</h3>
                            </li>
                        ))}
                </ol>
            </PerfectScrollbar>
        </div>
    );
};
