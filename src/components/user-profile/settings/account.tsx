import { MdManageAccounts } from 'react-icons/md';

export const Account: React.FC = () => {
    return (
        <div className="p-4 h-full rounded-lg shadow-lg bg-gray-900">
            <h1 className="font-bold text-2xl mb-4 text-white">
                <MdManageAccounts className="inline-block" /> Account
            </h1>
        </div>
    );
};
