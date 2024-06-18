import { AiOutlineLoading } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';

interface ButtonsProps {
    isLoading: boolean;
    signUp: (event: any) => Promise<void>;
}

export const Buttons: React.FC<ButtonsProps> = ({ isLoading, signUp }: ButtonsProps) => {
    return (
        <button
            className="flex gap-2 items-center justify-center w-full text-white animated-gradient-bg focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg shadow-pink-500/50"
            onClick={(event) => signUp(event)}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <AiOutlineLoading className="w-5 h-5 text-transparent animate-spin fill-white" /> Hold on...
                </>
            ) : (
                <>
                    <FaSave size={20} /> Create account
                </>
            )}
        </button>
    );
};
