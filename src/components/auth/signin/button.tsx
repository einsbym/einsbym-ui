import { AiOutlineLoading } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';

interface ButtonProps {
    isLoading: boolean;
    signIn: (preventDefault: () => void) => Promise<void>;
}

export const Button: React.FC<ButtonProps> = ({ isLoading, signIn }: ButtonProps) => {
    return (
        <div className="relative border border-white rounded-lg group overflow-hidden">
            <div className="absolute top-0 left-0 h-full -z-10 w-0 bg-white group-hover:w-full transition-all duration-200"></div>
            <button
                className="flex gap-2 items-center justify-center w-full text-white group-hover:text-black font-bold text-sm px-5 py-2.5 text-center transition-all duration-200"
                onClick={(event) => signIn(event.preventDefault)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <AiOutlineLoading className="w-5 h-5 animate-spin" />{' '}
                        Signing in...
                    </>
                ) : (
                    <>
                        <CiLogin size={25} /> Sign In
                    </>
                )}
            </button>
        </div>
    );
};
