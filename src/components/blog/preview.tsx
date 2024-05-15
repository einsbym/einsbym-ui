const headerSizes: any = {
    1: 'text-6xl',
    2: 'text-5xl',
    3: 'text-4xl',
    4: 'text-3xl',
    5: 'text-2xl',
    6: 'text-xl',
};

export default function Preview(props: { title: string | undefined; data: any[] }) {
    return (
        <div className="w-1/3 mt-10 ml-5 bg-gray-900 p-5 rounded-lg shadow-lg border border-[#cc00ff]">
            {props.title && <h1 className="text-5xl text-md mb-5 font-mono text-[#cc00ff]">{props.title}</h1>}
            {props.data.map((block) => {
                if (block.type === 'header') {
                    return (
                        <h1
                            key={block.id}
                            className={`mb-2 text-[#cc00ff] font-bold ${headerSizes[block.data.level]}`}
                            dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                        ></h1>
                    );
                }

                if (block.type === 'paragraph') {
                    return (
                        <p
                            key={block.id}
                            className="mb-2 font-serif"
                            dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                        ></p>
                    );
                }
            })}
        </div>
    );
}
