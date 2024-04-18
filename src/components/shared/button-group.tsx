const tags = [
    { id: 1, name: 'GIF', slug: 'gif' },
    { id: 2, name: 'People', slug: 'people' },
    { id: 3, name: 'Places', slug: 'places' },
    { id: 4, name: 'Vehicles', slug: 'vehicles' },
    { id: 5, name: 'Events', slug: 'events' },
    { id: 6, name: 'Selfies', slug: 'selfies' },
    { id: 7, name: 'Traveling', slug: 'traveling' },
];

export default function ButtonGroup() {
    return (
        <div className="px-2 mt-20 mb-2">
            {tags.map((tag) => (
                <button
                    key={tag.slug}
                    className={
                        'relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-whitetext-white focus:ring-4 focus:outline-none focus:ring-purple-800'
                    }
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {tag.name}
                    </span>
                </button>
            ))}
        </div>
    );
}
