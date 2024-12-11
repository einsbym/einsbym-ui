import { ApolloWrapper } from '@/graphql/apollo-provider/apollo-provider';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
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

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'pink',
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
