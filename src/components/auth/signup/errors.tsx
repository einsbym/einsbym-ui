import { z } from 'zod';

interface ErrorsProps {
    errorMessage: string | null | undefined;
    zodIssues: z.ZodIssue[];
}

export const Errors: React.FC<ErrorsProps> = ({ errorMessage, zodIssues }: ErrorsProps) => {
    return (
        <>
            {errorMessage && (
                <div className="flex justify-center mt-5 mb-5">
                    <div className="flex gap-2 items-center w-fit p-2 text-[#ff0000] border border-[#ff0000] bg-[#ff00001a] rounded-lg">
                        {errorMessage}
                    </div>
                </div>
            )}
            {zodIssues.length > 0 &&
                zodIssues.map((error, index) => (
                    <div key={index} className="flex justify-center mt-5 mb-5">
                        <div className="flex gap-2 items-center w-fit p-2 text-[#ff0000] border border-[#ff0000] bg-[#ff00001a] rounded-lg">
                            {error.message}
                        </div>
                    </div>
                ))}
        </>
    );
};
