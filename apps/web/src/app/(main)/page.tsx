'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ListCard } from '@/components/list/list-card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for initial development
const mockLists = [
    {
        id: '1',
        title: '2024 Must-Watch Movies',
        description: 'A curated collection of the best films released this year',
        coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        category: 'Movies',
        itemCount: 15,
        likes: 1243,
        saves: 567,
        createdAt: new Date().toISOString(),
        user: {
            id: '1',
            displayName: 'FilmCritic',
            username: 'filmcritic',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FilmCritic',
        },
    },
    {
        id: '2',
        title: 'Essential Coding Books',
        description: 'The books that every developer should read',
        coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800',
        category: 'Tech',
        itemCount: 12,
        likes: 892,
        saves: 423,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        user: {
            id: '2',
            displayName: 'CodeMaster',
            username: 'codemaster',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster',
        },
    },
    {
        id: '3',
        title: 'Travel Essentials 2024',
        description: 'Everything you need for the perfect trip',
        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        category: 'Travel',
        itemCount: 25,
        likes: 2156,
        saves: 1089,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        user: {
            id: '3',
            displayName: 'Wanderlust',
            username: 'wanderlust',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wanderlust',
        },
    },
];

async function fetchLists() {
    // TODO: Replace with actual API call
    await new Promise((res) => setTimeout(res, 500));
    return mockLists;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function HomePage() {
    const { data: lists, isLoading } = useQuery({
        queryKey: ['lists', 'feed'],
        queryFn: fetchLists,
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold md:text-3xl">Discover</h1>
                    <p className="text-muted-foreground">
                        Explore curated lists from the community
                    </p>
                </div>
                <div className="hidden items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-primary md:flex">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">AI Powered</span>
                </div>
            </header>

            {/* Lists Grid */}
            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg border bg-card">
                            <Skeleton className="aspect-[16/9] w-full" />
                            <div className="space-y-3 p-4">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {lists?.map((list) => (
                        <motion.div key={list.id} variants={item}>
                            <ListCard list={list} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
