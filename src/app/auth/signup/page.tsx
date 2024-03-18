'use client';

import UserBlurredCover from '@/app/profile/components/user-blurred-cover';
import IconLoading from '@/components/icon-loading';
import { FIND_RANDOM_IMAGE } from '@/graphql/queries/image';
import { SigninInput } from '@/interfaces/interfaces';
import { AuthService } from '@/services/auth.service';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

export default function Login() {
    const [signinInput, setSigninInput] = useState<SigninInput>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // Queries
    const { data, loading } = useQuery(FIND_RANDOM_IMAGE);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSigninInput({
            ...signinInput,
            [event.target.type]: event.target.value,
        });
    };

    const signIn = async (preventDefault: () => void) => {
        await new AuthService().signIn(preventDefault, setIsLoading, setErrorMessage, signinInput, router);
    };

    return (
        <>
            {data && <UserBlurredCover coverImage={data.findRandomImage.filename} />}
            <div className="flex items-center justify-center h-screen">
                <div className="overflow-hidden rounded-lg flex items-center justify-center w-4/5 pt-10 pb-10 md:w-1/4 backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
                    <div className="w-full ml-10 mr-10 space-y-6">
                        <a href="/auth/login"><FaArrowLeft className='text-[#cc00ff] cursor-pointer' /></a>
                        <div>
                            <h1 className="text-2xl text-[#cc00ff] font-bold">Create your account</h1>
                            <p className="mt-2 text-white">Just fill in all the necessary information in the box below, and you&apos;re done.</p>
                        </div>
                        <form className="">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_username"
                                    id="username"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b appearance-none text-white border-white focus:border-[#cc00ff] caret-[#cc00ff] focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    autoComplete="on"
                                    required
                                    onChange={(event) => handleChange(event)}
                                />
                                <label
                                    htmlFor="username"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Username
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="firstName"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b appearance-none text-white border-white focus:border-[#cc00ff] caret-[#cc00ff] focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    autoComplete="on"
                                    required
                                    onChange={(event) => handleChange(event)}
                                />
                                <label
                                    htmlFor="firstName"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    First name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="email"
                                    name="floating_email"
                                    id="email"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b appearance-none text-white border-white focus:border-[#cc00ff] caret-[#cc00ff] focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    autoComplete="on"
                                    required
                                    onChange={(event) => handleChange(event)}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    E-mail address
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="password"
                                    name="floating_password"
                                    id="password"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b text-white border-white appearance-none focus:outline-none focus:ring-0 focus:border-[#cc00ff] caret-[#cc00ff] peer"
                                    placeholder=""
                                    required
                                    onChange={(event) => handleChange(event)}
                                />
                                <label
                                    htmlFor="password"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="password"
                                    name="floating_confirm_password"
                                    id="confirmPassword"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b text-white border-white appearance-none focus:outline-none focus:ring-0 focus:border-[#cc00ff] caret-[#cc00ff] peer"
                                    placeholder=""
                                    required
                                    onChange={(event) => handleChange(event)}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc00ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Confirm password
                                </label>
                            </div>
                            {errorMessage && (
                                <div className="flex justify-center mt-5 mb-5">
                                    <div className="flex gap-2 items-center w-fit p-2 text-[#ff0000] border border-[#ff0000] bg-[#ff00001a] rounded-lg">
                                        <MdError /> {errorMessage}
                                    </div>
                                </div>
                            )}
                            <button
                                className="flex gap-2 items-center justify-center w-full text-white animated-gradient-bg focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg shadow-pink-500/50"
                                onClick={(event) => signIn(event.preventDefault)}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <IconLoading title="Hold on..." />
                                ) : (
                                    <>
                                        <FaSave size={20} /> Create account
                                    </>
                                )}
                            </button>
                            <div className='mt-5 text-sm text-center'>By creating an account, you agree to our <a className='text-[#cc00ff] hover:border-b-2 hover:border-b-[#cc00ff]' href="/auth/signup">terms and conditions</a>, as well as our <a className='text-[#cc00ff] hover:border-b-2 hover:border-b-[#cc00ff]' href="/auth/signup">privacy policy</a>.</div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
