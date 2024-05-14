import { getAccessTokenFromCookie } from '@/auth/cookies';
import { backend } from '@/constants/constants';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { Dispatch, SetStateAction } from 'react';

const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editorjs',
    tools: {
        header: Header,
    },
});

export default function CustomEditorJs(props: { setData: Dispatch<SetStateAction<any[]>> }) {
    const savePost = async () => {
        try {
            // Create an instance of `FormData`
            const formData = new FormData();

            // Append data
            formData.append('title', 'This is the title of the post');
            formData.append('file', '');
            formData.append('description', 'A short text describing the core message');
            formData.append('tags', "['feature', 'news', 'bug']");

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

    const saveData = () => {
        // Save data from Editor.JS
        editor
            .save()
            .then((outputData) => {
                console.log('Article data: ', outputData);
                props.setData(outputData.blocks);
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    return (
        <button
            type="button"
            className="w-full bg-white text-black font-medium rounded-lg shadow-lg text-center p-2 hover:bg-gray-200"
            onClick={() => saveData()}
        >
            save text
        </button>
    );
}
