'use client';

import useAuth from '@/auth/use-auth';
import { SIGN_IN } from '@/graphql/mutations/auth';
import { SigninInput } from '@/interfaces/interfaces';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
    const [signinInput, setSigninInput] = useState<SigninInput>({ email: '', password: '' });
    const [signIn, { data, loading, error }] = useMutation(SIGN_IN);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const { setUser } = useAuth();

    const handleChange = (target: any) => {
        setSigninInput({
            ...signinInput,
            [target.type]: target.value,
        });
    };

    const login = async (e: any) => {
        e.preventDefault();

        setErrorMessage('');

        try {
            await signIn({
                variables: {
                    signin: {
                        email: signinInput?.email,
                        password: signinInput?.password,
                    },
                },
            })
                .then((result) => {
                    localStorage.setItem('accessToken', result?.data.signin.accessToken);

                    setUser(result?.data.signin.user);

                    router.push('/');
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        } catch (error) {
            setErrorMessage('Something went wrong.');
        }
    };

    return (
        <div className="flex flex-col items-center md:flex-row md:h-screen">
            <div className="flex items-center justify-center w-full md:w-1/2">
                <Image src="/bg.svg" alt="Login Image" width={800} height={600} />
            </div>
            <div
                className={`${
                    errorMessage.length !== 0 ? 'lg:border lg:border-[#ff0000]' : null
                } lg:bg-gray-900 p-10 rounded-lg flex flex-col items-center justify-center w-full md:w-1/4`}
            >
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold">Hi!</h1>
                        <p className="mt-2 text-gray-600">Please sign in to your account.</p>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="block font-bold text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full text-gray-900 px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                required
                                onChange={(e) => handleChange(e.target)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-bold text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full text-gray-900 px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                required
                                onChange={(e) => handleChange(e.target)}
                            />
                        </div>
                        {errorMessage.length !== 0 ? (
                            <div className="flex justify-center mt-5">
                                <div className="w-fit p-2 text-[#ff0000] border border-[#ff0000] bg-[#ff00001a] rounded-lg">
                                    {errorMessage}
                                </div>
                            </div>
                        ) : null}
                        <div>
                            <button
                                className="w-full px-4 py-3 font-bold text-white bg-[#cc00ff] rounded-md hover:bg-[#cc00ff1e] focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                                onClick={(e) => login(e)}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
