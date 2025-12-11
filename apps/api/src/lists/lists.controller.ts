import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';

@Controller('lists')
export class ListsController {
    constructor(private readonly listsService: ListsService) { }

    @Post()
    @UseGuards(ClerkAuthGuard)
    create(@Req() req: Request & { user: any }, @Body() createListDto: CreateListDto) {
        return this.listsService.create(req.user.userId, createListDto);
    }

    @Get()
    findAll(@Query('cursor') cursor?: string, @Query('limit') limit?: number) {
        return this.listsService.findAll({ cursor, limit });
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req?: Request & { user?: any }) {
        return this.listsService.findOne(id, req?.user?.userId);
    }

    @Put(':id')
    @UseGuards(ClerkAuthGuard)
    update(@Param('id') id: string, @Req() req: Request & { user: any }, @Body() updateListDto: UpdateListDto) {
        return this.listsService.update(id, req.user.userId, updateListDto);
    }

    @Delete(':id')
    @UseGuards(ClerkAuthGuard)
    remove(@Param('id') id: string, @Req() req: Request & { user: any }) {
        return this.listsService.remove(id, req.user.userId);
    }

    @Post(':id/like')
    @UseGuards(ClerkAuthGuard)
    toggleLike(@Param('id') id: string, @Req() req: Request & { user: any }) {
        return this.listsService.toggleLike(id, req.user.userId);
    }

    @Post(':id/save')
    @UseGuards(ClerkAuthGuard)
    toggleSave(@Param('id') id: string, @Req() req: Request & { user: any }) {
        return this.listsService.toggleSave(id, req.user.userId);
    }
}
