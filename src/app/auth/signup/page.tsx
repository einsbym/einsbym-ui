'use client';

import { AuthService } from '@/auth/auth.service';
import { Form } from '@/components/auth/signup/form';
import { backend } from '@/constants/constants';
import { CREATE_USER } from '@/graphql/mutations/user';
import { FIND_RANDOM_FILE } from '@/graphql/queries/file';
import { SignUpType } from '@/types/types';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { z } from 'zod';

export default function Login() {
    const [signUpInput, setSignUpInput] = useState<SignUpType>({
        email: '',
        firstName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [zodIssues, setZodIssues] = useState<z.ZodIssue[]>([]);
    const router = useRouter();

    const SignUpInputSchema = z
        .object({
            email: z.string().email('🚩 this is not a valid email.'),
            firstName: z.string().min(1, 'Your name has NO characters? 😱').max(100, '🚩 invalid name'),
            username: z.string().min(3, 'This username is really small').max(100, 'This username is just huuuuge'),
            password: z.string().min(8, '🔒 your password must contain at least 8 characters'),
        })
        .required();

    // Queries
    const { data, loading } = useQuery(FIND_RANDOM_FILE);

    // Mutations
    const [createUser] = useMutation(CREATE_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignUpInput({
            ...signUpInput,
            [event.target.name]: event.target.value,
        });
    };

    const signUp = async (event: any) => {
        event.preventDefault();

        setIsLoading(true);
        setErrorMessage(null);
        setZodIssues([]);

        try {
            const validation = SignUpInputSchema.safeParse(signUpInput);

            if (!validation.success) {
                const { errors } = validation.error;
                setZodIssues(errors);
                throw new Error('Some fields are invalid');
            }

            if (signUpInput.password !== signUpInput.confirmPassword) {
                throw new Error("🖐️ Passwords don't match");
            }

            // now we can send the data to server
            const { errors } = await createUser({
                variables: {
                    createUserInput: {
                        username: signUpInput.username,
                        firstName: signUpInput.firstName,
                        email: signUpInput.email,
                        password: signUpInput.password,
                    },
                },
            });

            if (errors) {
                throw new Error("For some reason, your account could not be created. We're so sorry... 😭");
            }

            // Perform login
            await new AuthService().signIn(
                event.preventDefault(),
                setIsLoading,
                setErrorMessage,
                { email: signUpInput.email, password: signUpInput.password },
                router,
            );
        } catch (error: any) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="inset-0 h-screen flex justify-center items-center">
            <div className="w-11/12 lg:w-3/5 lg:h-3/4 flex rounded-2xl overflow-hidden shadow-xl">
                <div className="lg:w-2/3 space-y-6 p-10 rounded-lg bg-gray-900">
                    <a href="/auth/signin">
                        <FaArrowLeft className="text-[#cc00ff] cursor-pointer" />
                    </a>
                    <div>
                        <h1 className="text-2xl text-[#cc00ff] font-bold">Create your account</h1>
                        <p className="mt-2 text-white">
                            Just fill in all the necessary information in the box below, and you&apos;re done.
                        </p>
                    </div>
                    
                    <Form
                        errorMessage={errorMessage}
                        handleChange={handleChange}
                        isLoading={isLoading}
                        signUp={signUp}
                        zodIssues={zodIssues}
                    />
                </div>

                <div
                    style={{
                        backgroundImage: data ? `url(${backend.storageUrl + data.findRandomFile.filename})` : 'none',
                    }}
                    className="hidden lg:block w-full h-full bg-cover bg-center"
                ></div>
            </div>
        </div>
    );
}
