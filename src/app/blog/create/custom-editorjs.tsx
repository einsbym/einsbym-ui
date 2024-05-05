import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

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
                    text: 'After you create a new EditorJS object, it will contain isReady property. It is a Promise object that will be resolved when the Editor is ready for work and rejected otherwise. If there is an error during initialization the isReady promise will be rejected with an error message.',
                },
            },
        ],
    },
});

export default function CustomEditorJs() {}
