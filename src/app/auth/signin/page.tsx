'use client';

import { AuthService } from '@/auth/auth.service';
import IconLoading from '@/components/shared/icon-loading';
import UserBlurredCover from '@/components/user-account/user-blurred-cover';
import { api } from '@/constants/constants';
import { FIND_RANDOM_IMAGE } from '@/graphql/queries/image';
import { SigninInput } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { CiLogin } from 'react-icons/ci';
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
                <div className="overflow-hidden rounded-lg flex items-center justify-center w-4/5 pt-10 pb-10 md:pt-0 md:pb-0 md:w-1/2 md:h-4/6 backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
                    <div
                        style={{
                            backgroundImage: data ? `url('${api.storageUrl + data.findRandomImage.filename}')` : 'none',
                        }}
                        className={`hidden relative md:block w-full h-full bg-cover bg-no-repeat bg-center`}
                    >
                        <div className="absolute bottom-2 left-2 flex items-center gap-2">
                            <img
                                alt={data?.findRandomImage.post.user.username}
                                className="flex-none w-[45px] h-[45px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                                src={api.storageUrl + data?.findRandomImage.post.user.profilePicture}
                            />
                            <span className="text-sm font-semibold text-white bg-[#0000003b] p-2 rounded-md">
                                {data?.findRandomImage.post.user.username}
                            </span>
                        </div>
                    </div>
                    <div className="w-full ml-10 mr-10 space-y-6">
                        <div>
                            <h1 className="text-2xl text-[#cc00ff] font-bold">Hi!</h1>
                            <p className="mt-2 text-white">Please sign in to your account.</p>
                        </div>
                        <form className="">
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
                                    <IconLoading title="Signing in..." />
                                ) : (
                                    <>
                                        <CiLogin size={25} /> Sign In
                                    </>
                                )}
                            </button>
                            <div className="mt-5 text-sm text-center">
                                Don&apos;t have an account? No problem, you can{' '}
                                <a
                                    className="text-[#cc00ff] hover:border-b-2 hover:border-b-[#cc00ff]"
                                    href="/auth/signup"
                                >
                                    sign up here
                                </a>
                                .
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
