import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
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

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findByUsername(username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                lists: {
                    where: { privacy: 'PUBLIC' },
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
                _count: {
                    select: {
                        lists: true,
                        followers: true,
                        following: true,
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async update(id: string, data: { displayName?: string; bio?: string; avatar?: string }) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
}
