import { TbEyeEdit } from 'react-icons/tb';
import Statistics from './statistics';

const headerSizes: any = {
    1: 'text-6xl',
    2: 'text-5xl',
    3: 'text-4xl',
    4: 'text-3xl',
    5: 'text-2xl',
    6: 'text-xl',
};

export default function Preview(props: { title: string | undefined; description: string | undefined; data: any[] }) {
    return (
        props.data.length > 0 && (
            <div className="w-1/3 mt-10 ml-5 bg-gray-900 p-5 rounded-lg shadow-lg border-l-4 border-[#cc00ff]">
                <div className="w-fit flex gap-2 items-center border-b-2 mb-5 border-[#cc00ff]">
                    <TbEyeEdit /> Preview
                </div>
                {props.title && <h1 className="text-5xl text-md mb-5 font-serif text-[#cc00ff]">{props.title}</h1>}
                {props.description && <p className="italic text-sm mb-2 font-serif text-white">{props.description}</p>}
                {props.data.map((block) => {
                    if (block.type === 'header') {
                        return (
                            <h1
                                key={block.id}
                                className={`text-[#cc00ff] font-bold my-5 ${headerSizes[block.data.level]}`}
                                dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                            ></h1>
                        );
                    }

                    if (block.type === 'paragraph') {
                        return (
                            <p
                                key={block.id}
                                className="mb-2 leading-6"
                                dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                            ></p>
                        );
                    }
                })}
                <Statistics data={props.data} />
            </div>
        )
    );
}
