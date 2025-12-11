import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async findOrCreateUser(clerkId: string, email: string, data?: { displayName?: string; avatar?: string }) {
        let user = await this.prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) {
            // Generate username from email
            const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') +
                Math.random().toString(36).substring(2, 6);

            user = await this.prisma.user.create({
                data: {
                    clerkId,
                    email,
                    username,
                    displayName: data?.displayName || email.split('@')[0],
                    avatar: data?.avatar,
                },
            });
        }

        return user;
    }

    async getUserByClerkId(clerkId: string) {
        return this.prisma.user.findUnique({
            where: { clerkId },
            include: {
                _count: {
                    select: {
                        lists: true,
                        followers: true,
                        following: true,
                    },
                },
            },
        });
    }
}
