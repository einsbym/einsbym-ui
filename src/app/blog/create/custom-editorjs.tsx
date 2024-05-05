import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

export default function CustomEditorJs() {
    const editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'editorjs',
        tools: {
            header: Header,
        },
        data: {
            blocks: [
                {
                    id: 'eD2kuEfvgm',
                    type: 'paragraph',
                    data: {
                        text: 'Clean data is useful to sanitize, validate and process on the backend.',
                    },
                },
            ],
        },
    });

    return <div id="editorjs" className="mt-5 w-full bg-gray-900 rounded-lg shadow-lg"></div>;
}
