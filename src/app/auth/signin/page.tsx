'use client';

import { AuthService } from '@/auth/auth.service';
import BlurredBackground from '@/components/shared/blurred-background';
import { FIND_RANDOM_FILE } from '@/graphql/queries/file';
import { SignInType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FeaturedImage } from '../../../components/auth/signin/featured-image';
import { Form } from '../../../components/auth/signin/form';

export default function Login() {
    const [signinInput, setSigninInput] = useState<SignInType>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // Queries
    const { data } = useQuery(FIND_RANDOM_FILE);

    const signIn = async (preventDefault: () => void) => {
        await new AuthService().signIn(preventDefault, setIsLoading, setErrorMessage, signinInput, router);
    };

    return (
        <>
            {data && <BlurredBackground coverImage={data.findRandomFile.filename} />}
            <div className="flex items-center justify-center h-screen">
                <div className="overflow-hidden rounded-lg flex items-center justify-center w-4/5 pt-10 pb-10 md:pt-0 md:pb-0 md:w-1/2 md:h-4/6 backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
                    {data && <FeaturedImage data={data} />}
                    <div className="w-full ml-10 mr-10 space-y-6">
                        <div>
                            <h1 className="text-2xl text-[#cc00ff] font-bold">Hi!</h1>
                            <p className="mt-2 text-white">Please sign in to your account.</p>
                        </div>
                        
                        <Form
                            errorMessage={errorMessage}
                            isLoading={isLoading}
                            signinInput={signinInput}
                            setSigninInput={setSigninInput}
                            signIn={signIn}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
