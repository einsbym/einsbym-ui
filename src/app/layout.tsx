import '@mantine/core/styles.css';
import './globals.css';

import { ApolloWrapper } from '@/graphql/apollo-provider/apollo-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createTheme, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: 'Einsbym | %s',
        default: 'Einsbym',
    },
};

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <ApolloWrapper>
                <body className={inter.className}>
                    <MantineProvider theme={theme} defaultColorScheme="dark">
                        {children}
                    </MantineProvider>
                </body>
            </ApolloWrapper>
        </html>
    );
}
