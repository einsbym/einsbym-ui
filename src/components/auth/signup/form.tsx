import { z } from 'zod';
import { Button } from './button';
import { ChangeEvent } from 'react';
import { Errors } from './errors';

interface FormProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string | null | undefined;
    zodIssues: z.ZodIssue[];
    isLoading: boolean;
    signUp: (event: any) => Promise<void>;
}

export const Form: React.FC<FormProps> = ({ handleChange, errorMessage, zodIssues, isLoading, signUp }: FormProps) => {
    return (
        <form>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b appearance-none text-white border-white focus:border-[#cc00ff] caret-[#cc00ff] focus:outline-none focus:ring-0 peer"
                    autoComplete="username"
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
                    name="firstName"
                    id="firstName"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b appearance-none text-white border-white focus:border-[#cc00ff] caret-[#cc00ff] focus:outline-none focus:ring-0 peer"
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
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b appearance-none text-white border-white focus:border-[#cc00ff] caret-[#cc00ff] focus:outline-none focus:ring-0 peer"
                    autoComplete="email"
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
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b text-white border-white appearance-none focus:outline-none focus:ring-0 focus:border-[#cc00ff] caret-[#cc00ff] peer"
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
                    name="confirmPassword"
                    id="confirmPassword"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b text-white border-white appearance-none focus:outline-none focus:ring-0 focus:border-[#cc00ff] caret-[#cc00ff] peer"
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

            <Errors errorMessage={errorMessage} zodIssues={zodIssues} />

            <Button isLoading={isLoading} signUp={signUp} />

            <div className="mt-5 text-sm text-center text-white">
                By creating an account, you agree to our{' '}
                <a className="text-[#cc00ff] hover:border-b-2 hover:border-b-[#cc00ff]" href="/auth/signup">
                    terms and conditions
                </a>
                , as well as our{' '}
                <a className="text-[#cc00ff] hover:border-b-2 hover:border-b-[#cc00ff]" href="/auth/signup">
                    privacy policy
                </a>
                .
            </div>
        </form>
    );
};
