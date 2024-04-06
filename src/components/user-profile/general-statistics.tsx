import { FIND_USER_STATS } from '@/graphql/queries/user';
import { useQuery } from '@apollo/client';

export default function GeneralStatistics(props: { username: string }) {
    // Queries
    const { data, loading } = useQuery(FIND_USER_STATS, {
        variables: {
            username: props.username,
        },
        fetchPolicy: 'no-cache',
    });

    if (loading) {
        return (
            <div className="w-11/12 lg:w-4/5 mx-auto p-4 rounded-lg shadow backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
                <div role="status" className="animate-pulse">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 lg:w-4/5 mx-auto rounded-lg shadow backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
            <ul className="text-sm font-medium text-center sm:flex text-gray-400" id="fullWidthTab">
                <li className="w-full">
                    <button
                        id="stats-tab"
                        type="button"
                        className="inline-block w-full p-4 rounded-ss-lg rounded-se-lg focus:outline-none"
                    >
                        Statistics
                    </button>
                </li>
            </ul>
            <div id="fullWidthTabContent" className="border-t border-white">
                <div className="p-4 rounded-lg md:p-8" id="stats">
                    <div className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-3 xl:p-2 xl:grid-cols-6 text-white sm:p-8">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">0</dt>
                            <dd className="text-gray-400">Ranking</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">0%</dt>
                            <dd className="text-gray-400">Engagement</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.findUserStats.totalLikes}</dt>
                            <dd className="text-gray-400">Likes given</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.findUserStats.totalComments}</dt>
                            <dd className="text-gray-400">Comments</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.findUserStats.totalPosts}</dt>
                            <dd className="text-gray-400">Posts</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.findUserStats.totalFiles}</dt>
                            <dd className="text-gray-400">Files</dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
