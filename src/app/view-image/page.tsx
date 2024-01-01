'use client';

import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';

export default function ViewImage() {
    // Set the value received from the local storage to a local state
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        // Get the value from local storage if it exists
        const value = localStorage.getItem('selectedImage') || '';
        setSelectedImage(value);
    }, []);

    return (
        <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <Navbar />

            <div className="flex justify-center">
                <img className="rounded-lg object-cover" src={selectedImage} />
            </div>
        </main>
    );
}
