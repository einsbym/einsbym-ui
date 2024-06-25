import { ONLINE_INSTANCES } from '@/graphql/queries/user';
import { useQuery } from '@apollo/client';
import { MdOutlinePrivacyTip } from 'react-icons/md';

export const Security: React.FC = () => {
    const { data: onlineInstances } = useQuery(ONLINE_INSTANCES);

    return (
        <div className="p-4 h-full rounded-lg shadow-lg bg-gray-900">
            <h1 className="font-bold text-2xl mb-4 text-white">
                <MdOutlinePrivacyTip className="inline-block" /> Security
            </h1>
            {onlineInstances && (
                <span className="block text-sm font-medium w-full text-center p-2 bg-yellow-500/20 text-yellow-300 rounded-lg">
                    You are currently connected in <span className="font-bold text-lg">{onlineInstances.onlineInstances}</span>{' '}
                    different places
                </span>
            )}
        </div>
    );
};
