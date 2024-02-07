'use client';

import { createAccessTokenCookie, createUserCookie } from '@/actions/cookies';
import { SigninInput } from '@/interfaces/interfaces';
import { AuthService } from '@/services/auth-config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import { MdError } from 'react-icons/md';

export default function Login() {
    const [signinInput, setSigninInput] = useState<SigninInput>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const router = useRouter();

    const handleChange = (target: any) => {
        setSigninInput({
            ...signinInput,
            [target.type]: target.value,
        });
    };

    const login = async (event: any) => {
        event.preventDefault();
        
        // Clear previous error messages
        setErrorMessage(null);

        try {
            const data = await new AuthService().getData(signinInput.email, signinInput.password);

            if (!data) {
                setErrorMessage('Invalid credentials. Try again.');
                return;
            }

            await createAccessTokenCookie(data.accessToken);
            await createUserCookie(data.user);

            router.push(`/profile`);
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
                    errorMessage ? 'lg:border lg:border-[#ff0000]' : null
                } lg:bg-gray-900 p-10 rounded-lg flex flex-col items-center justify-center w-full md:w-1/4`}
            >
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-2xl text-[#cc00ff] font-bold">Hi!</h1>
                        <p className="mt-2 text-gray-600">Please sign in to your account.</p>
                    </div>
                    <form className="mt-5 space-y-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#cc00ff] focus:outline-none focus:ring-0 focus:border-[#cc00ff] peer"
                                placeholder=""
                                required
                                onChange={(event) => handleChange(event.target)}
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-focus:dark:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="floating_password"
                                id="password"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#cc00ff] focus:outline-none focus:ring-0 focus:border-[#cc00ff] peer"
                                placeholder=""
                                required
                                onChange={(event) => handleChange(event.target)}
                            />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-focus:dark:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                        </div>
                        {errorMessage && (
                            <div className="flex justify-center mt-5">
                                <div className="flex gap-2 items-center w-fit p-2 text-[#ff0000] border border-[#ff0000] bg-[#ff00001a] rounded-lg">
                                    <MdError /> {errorMessage}
                                </div>
                            </div>
                        )}
                        <div>
                            <button
                                className="flex gap-2 items-center justify-center w-full text-white bg-gradient-to-r from-[#cc00ff] via-pink-500 to-[#cc00ff] hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg shadow-pink-500/50"
                                onClick={(event) => login(event)}
                            >
                                <CiLogin size={30} /> Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
