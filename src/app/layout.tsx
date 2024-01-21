import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/apollo-provider/apollo-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Einsbym',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <ApolloWrapper>
                <body className={inter.className}>{children}</body>
            </ApolloWrapper>
        </html>
    );
}
