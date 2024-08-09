import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

interface SlideShowProps {
    tags: string[];
}

export const BlogTags: React.FC<SlideShowProps> = ({ tags }) => {
    return (
        <div className="mt-5 w-full overflow-x-hidden">
            <PerfectScrollbar>
                <div className="flex gap-2">
                    {tags.map((tag: string) => (
                        <div
                            key={tag}
                            className="bg-[#cc00ff3a] group-hover:bg-black text-[#cc00ff] p-1 px-2 w-fit rounded-lg text-center text-nowrap"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </PerfectScrollbar>
        </div>
    );
};
