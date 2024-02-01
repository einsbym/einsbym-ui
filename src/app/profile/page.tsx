'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import UserCoverAndPhoto from './components/user-cover-and-photo';
import UserGeneralStatistics from './components/user-general-statistics';
import UserBioAndPost from './components/user-bio-and-post';
import UserPosts from './components/user-posts';
import UserGallery from './components/user-gallery';

export default function ViewImage() {
    return (
        <>
            <main className="mx-auto lg:pt-12">
                <Navbar />

                {/* User's cover and profile picture */}
                <UserCoverAndPhoto firstName='Bruna' lastName='Stenio' />

                {/* General statistics */}
                <UserGeneralStatistics />

                {/* User's content */}
                <div className="grid grid-cols-1 w-11/12 lg:grid-cols-2 gap-4 lg:w-4/5 mx-auto mt-5">
                    <div>
                        <UserBioAndPost />
                        <UserPosts />
                    </div>

                    <UserGallery />
                </div>

                <Footer />
            </main>
        </>
    );
}
