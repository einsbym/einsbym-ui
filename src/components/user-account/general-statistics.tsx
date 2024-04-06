export default function GeneralStatistics() {
    return (
        <div className="w-11/12 lg:w-4/5 mx-auto mt-5 rounded-lg shadow backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
            <ul
                className="text-sm font-medium text-center sm:flex text-gray-400"
                id="fullWidthTab"
            >
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
                            <dt className="mb-2 text-3xl font-extrabold">2º</dt>
                            <dd className="text-gray-400">Ranking</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">83%</dt>
                            <dd className="text-gray-400">Engagement</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">2k</dt>
                            <dd className="text-gray-400">Likes given</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">2k</dt>
                            <dd className="text-gray-400">Comments</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">235</dt>
                            <dd className="text-gray-400">Posts</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                            <dd className="text-gray-400">Views</dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
