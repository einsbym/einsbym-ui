import { FaChartBar, FaHeading } from 'react-icons/fa';
import { MdOutlineWrapText } from 'react-icons/md';
import { RiTextBlock } from 'react-icons/ri';
import { TbLetterCaseToggle } from 'react-icons/tb';

export default function Statistics(props: { data: any[] }) {
    const getTotalOfCharacters = () => {
        let total = 0;
        props.data.map((block) => {
            total += block.data.text.length;
        });
        return total;
    };

    const getTotalOfParagraphsAndHeaders = () => {
        let paragraphs = props.data.filter((block) => block.type === 'paragraph');
        let headers = props.data.filter((block) => block.type === 'header');
        return {
            totalOfParagraphs: paragraphs.length,
            totalOfHeaders: headers.length,
        };
    };

    return (
        <>
            <hr className="my-4 border-slate-800" />
            <div className="w-fit flex gap-2 items-center border-b-2 mb-5 border-[#cc00ff]">
                <FaChartBar /> Statistics
            </div>
            <div className="flex gap-2 items-center text-sm">
                <span className="flex gap-1 items-center bg-[#cc00ff3a] text-[#cc00ff] p-1 px-2 rounded-lg">
                    <RiTextBlock className="text-white" /> Total of blocks: {props.data.length}
                </span>
                <span className="flex gap-1 items-center bg-[#cc00ff3a] text-[#cc00ff] p-1 px-2 rounded-lg">
                    <TbLetterCaseToggle className="text-white" /> Total of characters: {getTotalOfCharacters()}
                </span>
                <span className="flex gap-1 items-center bg-[#cc00ff3a] text-[#cc00ff] p-1 px-2 rounded-lg">
                    <MdOutlineWrapText className="text-white" /> Total of paragraphs:{' '}
                    {getTotalOfParagraphsAndHeaders().totalOfParagraphs}
                </span>
                <span className="flex gap-1 items-center bg-[#cc00ff3a] text-[#cc00ff] p-1 px-2 rounded-lg">
                    <FaHeading className="text-white" /> Total of headers:{' '}
                    {getTotalOfParagraphsAndHeaders().totalOfHeaders}
                </span>
            </div>
        </>
    );
}
