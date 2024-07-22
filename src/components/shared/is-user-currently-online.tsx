import { IS_CURRENTLY_ONLINE } from '@/graphql/queries/user';
import { useQuery } from '@apollo/client';
import { FaCircle } from 'react-icons/fa';

interface IsUserCurrentlyOnlineProps {
    username: string;
}

export const IsUserCurrentlyOnline: React.FC<IsUserCurrentlyOnlineProps> = ({ username }) => {
    const { data } = useQuery(IS_CURRENTLY_ONLINE, {
        variables: {
            username: username,
        },
    });

    return (
        data &&
        data.isCurrentlyOnline && <FaCircle className="ml-2 inline-block animate-ping text-green-500 text-[8px]" />
    );
};
