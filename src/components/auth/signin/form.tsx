import { SignInType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';
import { Fields } from './fields';
import { Button } from './button';

interface FormProps {
    signinInput: SignInType;
    errorMessage: string | null | undefined;
    isLoading: boolean;
    setSigninInput: Dispatch<SetStateAction<SignInType>>;
    signIn: (preventDefault: () => void) => Promise<void>;
}

export const Form: React.FC<FormProps> = ({
    signinInput,
    errorMessage,
    isLoading,
    setSigninInput,
    signIn,
}: FormProps) => {
    return (
        <form>
            <Fields signinInput={signinInput} setSigninInput={setSigninInput} />

            {errorMessage && (
                <div className="flex justify-center mt-5 mb-5">
                    <div className="flex gap-2 items-center w-fit p-2 bg-red-800/20 text-red-600 rounded-lg">
                        {errorMessage}
                    </div>
                </div>
            )}

            <Button isLoading={isLoading} signIn={signIn} />

            <div className="mt-5 text-sm text-center text-white">
                Don&apos;t have an account? No problem, you can{' '}
                <a className="text-[#cc00ff] hover:border-b-2 hover:border-b-[#cc00ff]" href="/auth/signup">
                    sign up here
                </a>
                .
            </div>
        </form>
    );
};
