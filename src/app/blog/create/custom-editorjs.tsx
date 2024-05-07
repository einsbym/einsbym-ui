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
});

export default function CustomEditorJs() {
    const saveData = async () => {
        editor
            .save()
            .then((outputData) => {
                console.log('Article data: ', outputData);
            })
            .catch((error) => {
                console.log('Saving failed: ', error);
            });
    };

    return (
        <button
            type="button"
            className="w-full bg-white text-black font-medium rounded-lg shadow-lg text-center p-2"
            onClick={() => saveData()}
        >
            save text
        </button>
    );
}
