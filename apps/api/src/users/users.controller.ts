import { Controller, Get, Put, Param, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':username')
    findByUsername(@Param('username') username: string) {
        return this.usersService.findByUsername(username);
    }

    @Put('me')
    @UseGuards(ClerkAuthGuard)
    update(@Req() req: Request & { user: any }, @Body() body: { displayName?: string; bio?: string; avatar?: string }) {
        return this.usersService.update(req.user.userId, body);
    }
}
