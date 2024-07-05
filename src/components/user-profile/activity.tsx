import { FIND_ACTIVITIES } from '@/graphql/queries/user';
import { formatDate } from '@/utils/formatted-date';
import { useQuery } from '@apollo/client';

interface ActivityProps {
    userId: string;
    loggedUserId?: string | null;
}

export const Activity: React.FC<ActivityProps> = ({ userId, loggedUserId }) => {
    const { data, loading } = useQuery(FIND_ACTIVITIES, {
        variables: {
            userId: userId,
            take: 5,
        },
    });

    if (loading) {
        return (
            <div className="w-full mt-5 p-5 rounded-lg shadow bg-gray-900">
                <div role="status" className="animate-pulse">
                    <div className="h-2.5 rounded-full bg-gray-800 w-20 mb-2.5"></div>
                    <div className="h-2.5 rounded-full bg-gray-800 w-full mb-2.5 mx-auto"></div>
                    <div className="h-2.5 rounded-full bg-gray-800 w-full mb-2.5 mx-auto"></div>
                    <div className="h-2.5 rounded-full bg-gray-800 w-full mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 p-5 mt-5 rounded-lg">
            <h2 className="font-bold text-xl mb-2">Activity</h2>
            <ol className="relative border-s ml-5 border-[#cc00ff]">
                {data &&
                    data.findActivities.map((activity: any) => (
                        <li key={activity.id} className="mb-2 ms-4">
                            <div className="absolute w-3 h-3 bg-[#cc00ff] rounded-full mt-1.5 -start-1.5 border border-[#cc00ff]"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {formatDate(activity.createdAt)}
                            </time>
                            <h3 className="text-white">{activity.description}</h3>
                        </li>
                    ))}
            </ol>
            {!loggedUserId && (
                <a
                    href="/profile/settings"
                    className="block w-full text-center cursor-pointer mt-2 py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg border focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                >
                    View all activities
                </a>
            )}
        </div>
    );
};
