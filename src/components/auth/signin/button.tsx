import { AiOutlineLoading } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';

interface ButtonsProps {
    isLoading: boolean;
    signIn: (preventDefault: () => void) => Promise<void>;
}

export const Buttons: React.FC<ButtonsProps> = ({ isLoading, signIn }: ButtonsProps) => {
    return (
        <button
            className="flex gap-2 items-center justify-center w-full text-white animated-gradient-bg focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg shadow-pink-500/50"
            onClick={(event) => signIn(event.preventDefault)}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <AiOutlineLoading className="w-5 h-5 text-transparent animate-spin fill-white" /> Signing in...
                </>
            ) : (
                <>
                    <CiLogin size={25} /> Sign In
                </>
            )}
        </button>
    );
};
