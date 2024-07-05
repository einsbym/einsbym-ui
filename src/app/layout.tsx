import { ApolloWrapper } from '@/graphql/apollo-provider/apollo-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: 'Einsbym | %s',
        default: 'Einsbym',
    },
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
