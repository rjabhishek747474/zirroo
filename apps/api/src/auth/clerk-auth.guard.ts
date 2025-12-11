import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.split(' ')[1];

        try {
            // Decode JWT payload (Clerk tokens are JWTs)
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

            (request as any).user = {
                clerkId: payload.sub,
                userId: payload.sub,
                email: payload.email || payload.primary_email_address_id,
            };
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
