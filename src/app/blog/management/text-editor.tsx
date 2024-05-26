import { getAccessTokenFromCookie } from '@/auth/cookies';
import { backend } from '@/constants/constants';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { TbEyeEdit } from 'react-icons/tb';
import { StatusMessage } from './page';

const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editorjs',
    tools: {
        header: Header,
    },
});

export default function TextEditor(props: {
    title: string;
    description: string;
    setData: Dispatch<SetStateAction<any[]>>;
    setStatusMessage: Dispatch<SetStateAction<StatusMessage | undefined>>;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const savePost = async () => {
        try {
            setIsLoading(true);

            // Create an instance of `FormData`
            const formData = new FormData();

            // Append data
            formData.append('title', props.title);
            formData.append('file', '');
            formData.append('description', props.description);
            formData.append('tags', JSON.stringify(['feature', 'implementation', 'test', 'integration', 'editorjs']));

            // Save data from Editor.JS
            editor
                .save()
                .then((outputData) => {
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

            setIsLoading(false);
            props.setStatusMessage({ status: 'success', message: `Your post ${props.title} is now live!` });
        } catch (error) {
            console.error(error);
            props.setStatusMessage({ status: 'error', message: 'Oh no! Something is not right.' });
            setIsLoading(false);
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
        <div className="flex gap-2">
            <button
                id="saveBtn"
                type="button"
                className="flex gap-2 items-center justify-center w-full border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black uppercase font-bold rounded-lg shadow-lg text-center p-2 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                onClick={() => saveData()}
                disabled={isLoading}
            >
                <TbEyeEdit /> preview changes
            </button>
            <button
                id="saveBtn"
                type="button"
                className="flex gap-2 items-center justify-center w-full border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black uppercase font-bold rounded-lg shadow-lg text-center p-2 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                onClick={() => savePost()}
                disabled={isLoading}
            >
                <FiSend /> publish
            </button>
        </div>
    );
}
