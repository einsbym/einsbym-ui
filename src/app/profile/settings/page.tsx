'use client';

import { AuthService } from '@/auth/auth.service';
import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { UserType } from '@/types/types';
import { useEffect, useState } from 'react';

export default function UserSettings() {
    const [user, setUser] = useState<UserType | null>();
    const [isChecked, setIsChecked] = useState<boolean>(true);

    const togglePrivateProfile = () => {
        if (!isChecked) {
            console.log('make profile public');
            setIsChecked(true);
            return;
        }
        setIsChecked(false);
    };

    useEffect(() => {
        new AuthService().getUser(setUser);
    }, []);

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <main className="flex items-center justify-center w-full h-screen">
                <div className="p-4 rounded-lg shadow-lg bg-gray-900">
                    <h1 className="font-bold text-2xl mb-4">{user.firstName}&apos;s settings</h1>

                    <label className="inline-flex items-center cursor-pointer p-4 rounded-md bg-slate-800 hover:shadow-lg">
                        <input
                            type="checkbox"
                            value=""
                            checked={isChecked}
                            className="sr-only peer"
                            onChange={() => togglePrivateProfile()}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Make my profile private
                        </span>
                    </label>
                </div>
            </main>
        </>
    );
}
