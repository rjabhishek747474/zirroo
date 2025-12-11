import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Privacy } from '../common/enums/privacy.enum';

@Injectable()
export class ListsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createListDto: CreateListDto) {
        return this.prisma.list.create({
            data: {
                ...createListDto,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        username: true,
                        avatar: true,
                    },
                },
                items: true,
                _count: {
                    select: {
                        likes: true,
                        saves: true,
                    },
                },
            },
        });
    }

    async findAll(options?: { userId?: string; cursor?: string; limit?: number }) {
        const limit = options?.limit || 20;

        const lists = await this.prisma.list.findMany({
            where: {
                OR: [
                    { privacy: Privacy.PUBLIC },
                    ...(options?.userId ? [{ userId: options.userId }] : []),
                ],
            },
            take: limit,
            ...(options?.cursor && {
                skip: 1,
                cursor: { id: options.cursor },
            }),
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        username: true,
                        avatar: true,
                    },
                },
                _count: {
                    select: {
                        items: true,
                        likes: true,
                        saves: true,
                    },
                },
            },
        });

        return {
            lists,
            nextCursor: lists.length === limit ? lists[lists.length - 1].id : null,
        };
    }

    async findOne(id: string, userId?: string) {
        const list = await this.prisma.list.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        username: true,
                        avatar: true,
                        isVerified: true,
                    },
                },
                items: {
                    orderBy: { position: 'asc' },
                },
                _count: {
                    select: {
                        likes: true,
                        saves: true,
                    },
                },
            },
        });

        if (!list) {
            throw new NotFoundException('List not found');
        }

        // Check privacy
        if (list.privacy === Privacy.PRIVATE && list.userId !== userId) {
            throw new ForbiddenException('This list is private');
        }

        // Get user's interaction status
        const userInteraction = userId
            ? {
                isLiked: !!(await this.prisma.like.findUnique({
                    where: { userId_listId: { userId, listId: id } },
                })),
                isSaved: !!(await this.prisma.save.findUnique({
                    where: { userId_listId: { userId, listId: id } },
                })),
            }
            : { isLiked: false, isSaved: false };

        // Increment view count
        await this.prisma.list.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        });

        return { ...list, ...userInteraction };
    }

    async update(id: string, userId: string, updateListDto: UpdateListDto) {
        const list = await this.prisma.list.findUnique({ where: { id } });

        if (!list) {
            throw new NotFoundException('List not found');
        }

        if (list.userId !== userId) {
            throw new ForbiddenException('You can only update your own lists');
        }

        return this.prisma.list.update({
            where: { id },
            data: updateListDto,
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        username: true,
                        avatar: true,
                    },
                },
                items: true,
            },
        });
    }

    async remove(id: string, userId: string) {
        const list = await this.prisma.list.findUnique({ where: { id } });

        if (!list) {
            throw new NotFoundException('List not found');
        }

        if (list.userId !== userId) {
            throw new ForbiddenException('You can only delete your own lists');
        }

        await this.prisma.list.delete({ where: { id } });
        return { success: true };
    }

    async toggleLike(listId: string, userId: string) {
        const existing = await this.prisma.like.findUnique({
            where: { userId_listId: { userId, listId } },
        });

        if (existing) {
            await this.prisma.like.delete({
                where: { userId_listId: { userId, listId } },
            });
            return { liked: false };
        }

        await this.prisma.like.create({
            data: { userId, listId },
        });
        return { liked: true };
    }

    async toggleSave(listId: string, userId: string) {
        const existing = await this.prisma.save.findUnique({
            where: { userId_listId: { userId, listId } },
        });

        if (existing) {
            await this.prisma.save.delete({
                where: { userId_listId: { userId, listId } },
            });
            return { saved: false };
        }

        await this.prisma.save.create({
            data: { userId, listId },
        });
        return { saved: true };
    }
}
