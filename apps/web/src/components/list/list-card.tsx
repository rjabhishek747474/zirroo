'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Bookmark, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatNumber, formatDate } from '@/lib/utils';

interface ListCardProps {
    list: {
        id: string;
        title: string;
        description?: string;
        coverImage?: string;
        category?: string;
        itemCount: number;
        likes: number;
        saves: number;
        createdAt: string;
        user: {
            id: string;
            displayName: string;
            avatar?: string;
            username: string;
        };
    };
}

export function ListCard({ list }: ListCardProps) {
    return (
        <Link href={`/list/${list.id}`}>
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    {/* Cover Image */}
                    {list.coverImage && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                                src={list.coverImage}
                                alt={list.title}
                                fill
                                className="object-cover transition-transform hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {list.category && (
                                <Badge className="absolute right-2 top-2" variant="secondary">
                                    {list.category}
                                </Badge>
                            )}
                        </div>
                    )}

                    <CardContent className="p-4">
                        {/* User Info */}
                        <div className="mb-3 flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={list.user.avatar} alt={list.user.displayName} />
                                <AvatarFallback>{list.user.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                                {list.user.displayName}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                                {formatDate(list.createdAt)}
                            </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="mb-1 font-semibold leading-tight">{list.title}</h3>
                        {list.description && (
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {list.description}
                            </p>
                        )}

                        {/* Item Count */}
                        <p className="mt-2 text-xs text-muted-foreground">
                            {list.itemCount} items
                        </p>
                    </CardContent>

                    <CardFooter className="border-t px-4 py-3">
                        <div className="flex w-full items-center justify-between text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 text-sm">
                                    <Heart className="h-4 w-4" />
                                    {formatNumber(list.likes)}
                                </span>
                                <span className="flex items-center gap-1 text-sm">
                                    <Bookmark className="h-4 w-4" />
                                    {formatNumber(list.saves)}
                                </span>
                            </div>
                            <span className="flex items-center gap-1 text-sm">
                                <MessageCircle className="h-4 w-4" />
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </Link>
    );
}
