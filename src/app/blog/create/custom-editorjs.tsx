import { getAccessTokenFromCookie } from '@/auth/cookies';
import { backend } from '@/constants/constants';
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
    const savePost = async () => {
        try {
            // Create an instance of `FormData`
            const formData = new FormData();

            // Append data
            formData.append('title', 'yeeeeaaa');
            formData.append('file', '');
            formData.append('description', 'brooooo');
            formData.append('tags', "['a', 'b', 'c']");

            // Save data from Editor.JS
            editor
                .save()
                .then((outputData) => {
                    console.log('Article data: ', outputData);
                    formData.append('body', JSON.stringify(outputData));
                })
                .catch((error) => {
                    throw new Error(error);
                });

            // Get access token
            const accessToken = await getAccessTokenFromCookie();

            // Save post
            const response = await fetch(`${backend.restApiUrl}/blog/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken?.value.replace(/^"(.*)"$/, '$1')}`,
                },
                body: formData,
            });

            if (response.status !== 201) {
                throw new Error(response.statusText);
            }

            const responseJson = await response.json();

            console.log('All saved:', responseJson);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            type="button"
            className="w-full bg-white text-black font-medium rounded-lg shadow-lg text-center p-2"
            onClick={() => savePost()}
        >
            save text
        </button>
    );
}
