import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) { }

    async create(listId: string, data: { title: string; description?: string; url?: string }) {
        const maxPosition = await this.prisma.item.aggregate({
            where: { listId },
            _max: { position: true },
        });

        return this.prisma.item.create({
            data: {
                ...data,
                listId,
                position: (maxPosition._max.position || 0) + 1,
            },
        });
    }

    async update(id: string, data: { title?: string; description?: string; url?: string }) {
        return this.prisma.item.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        await this.prisma.item.delete({ where: { id } });
        return { success: true };
    }

    async reorder(listId: string, itemIds: string[]) {
        const updates = itemIds.map((id, index) =>
            this.prisma.item.update({
                where: { id },
                data: { position: index },
            }),
        );

        await this.prisma.$transaction(updates);
        return { success: true };
    }
}
