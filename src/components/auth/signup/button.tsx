import { AiOutlineLoading } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';

interface ButtonProps {
    isLoading: boolean;
    signUp: (event: any) => Promise<void>;
}

export const Button: React.FC<ButtonProps> = ({ isLoading, signUp }: ButtonProps) => {
    return (
        <div className="relative border border-white rounded-lg group overflow-hidden z-10">
            <div className="absolute top-0 left-0 h-full z-[-1] w-0 bg-white group-hover:w-full transition-all duration-200"></div>
            <button
                className="flex gap-2 items-center justify-center w-full text-white group-hover:text-black font-medium text-sm px-5 py-2.5 text-center transition-all duration-200"
                onClick={(event) => signUp(event)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <AiOutlineLoading className="w-5 h-5 animate-spin" />{' '}
                        Hold on...
                    </>
                ) : (
                    <>
                        <FaSave /> Create account
                    </>
                )}
            </button>
        </div>
    );
};
