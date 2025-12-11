import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <main className="pb-20 md:ml-64 md:pb-0">
                <div className="mx-auto max-w-5xl p-4 md:p-6">{children}</div>
            </main>
            <BottomNav />
        </div>
    );
}
