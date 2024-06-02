interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="mt-2 p-2 text-sm font-medium rounded-lg bg-red-800/20 text-red-600 text-center">{message}</div>
);
