import { SignInType } from "@/types/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputFieldsProps {
    signinInput: SignInType;
    setSigninInput: Dispatch<SetStateAction<SignInType>>;
}

export const InputFields: React.FC<InputFieldsProps> = ({ signinInput, setSigninInput }: InputFieldsProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSigninInput({
            ...signinInput,
            [event.target.type]: event.target.value,
        });
    };

    return (
        <>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="email"
                    name="floating_email"
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
                    name="floating_password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b text-white border-white appearance-none focus:outline-none focus:ring-0 focus:border-[#cc00ff] caret-[#cc00ff] peer"
                    autoComplete="current-password"
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
        </>
    );
};
