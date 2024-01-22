import { User } from '@/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useAuth = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const router = useRouter();

    const setUser = async (user: User) => {
        try {
            localStorage.setItem('user', JSON.stringify(user));
            setIsSignedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    const signOut = async () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');

            setIsSignedIn(false);

            router.push('/auth/login');
        } catch (error) {
            console.error(error);
        }
    };

    const getUser = () => {
        let user: User;
            const userStr = localStorage.getItem('user') || '';

            if (userStr.length === 0) {
                return null;
            }
            
            user = JSON.parse(userStr);
            return user;
    };

    return { setUser, signOut, getUser, isSignedIn };
};

export default useAuth;
