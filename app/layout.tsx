import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Online Shop - purchase process',
    description: 'Purchase process build with React, Next.js and xstate',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            data-theme="nord"
        >
            <body className={`${inter.className} max-w-5xl mx-auto`}>
                {children}
            </body>
        </html>
    );
}
