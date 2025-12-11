import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'ListShare - Share Your Lists With The World',
    description: 'A social platform for sharing curated lists with AI-powered recommendations',
    keywords: ['lists', 'sharing', 'social', 'curation', 'AI', 'recommendations'],
    authors: [{ name: 'ListShare' }],
    openGraph: {
        title: 'ListShare',
        description: 'Share your lists with the world',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${inter.variable} font-sans antialiased`}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
