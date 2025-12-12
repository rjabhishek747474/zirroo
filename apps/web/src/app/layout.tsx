import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Zirroo - Share Your Lists With The World',
    description: 'A social platform for sharing curated lists with AI-powered recommendations',
    keywords: ['lists', 'sharing', 'social', 'curation', 'AI', 'recommendations'],
    authors: [{ name: 'Zirroo' }],
    openGraph: {
        title: 'Zirroo',
        description: 'Share your lists with the world',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_ZG9taW5hbnQtcm9kZW50LTM5LmNsZXJrLmFjY291bnRzLmRldiQ';

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <html lang="en" suppressHydrationWarning>
                <body className={`${inter.variable} font-sans antialiased`}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
