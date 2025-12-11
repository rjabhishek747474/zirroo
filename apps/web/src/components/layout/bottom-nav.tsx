'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Search, Plus, Library, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/explore', icon: Search, label: 'Explore' },
    { href: '/create', icon: Plus, label: 'Create', isButton: true },
    { href: '/library', icon: Library, label: 'Library' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
            <div className="flex h-16 items-center justify-around px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    if (item.isButton) {
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                                >
                                    <item.icon className="h-6 w-6" />
                                </motion.div>
                            </Link>
                        );
                    }

                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className="flex flex-col items-center gap-1 px-3 py-1"
                            >
                                <item.icon
                                    className={cn(
                                        'h-6 w-6 transition-colors',
                                        isActive ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                />
                                <span
                                    className={cn(
                                        'text-xs',
                                        isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                                    )}
                                >
                                    {item.label}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
