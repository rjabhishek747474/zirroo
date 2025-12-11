import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('me')
    @UseGuards(ClerkAuthGuard)
    async getCurrentUser(@Req() req: Request & { user: any }) {
        const { clerkId } = req.user;
        return this.authService.getUserByClerkId(clerkId);
    }

    @Post('sync')
    @UseGuards(ClerkAuthGuard)
    async syncUser(@Req() req: Request & { user: any }, @Body() body: { displayName?: string; avatar?: string }) {
        const { clerkId, email } = req.user;
        return this.authService.findOrCreateUser(clerkId, email, body);
    }
}
