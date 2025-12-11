import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Core modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';
import { AiModule } from './ai/ai.module';
import { LinksModule } from './links/links.module';
import { HealthModule } from './health/health.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],
        }),

        // Rate limiting
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000,
                limit: 3,
            },
            {
                name: 'medium',
                ttl: 10000,
                limit: 20,
            },
            {
                name: 'long',
                ttl: 60000,
                limit: 100,
            },
        ]),

        // Core modules
        PrismaModule,
        AuthModule,
        UsersModule,
        ListsModule,
        ItemsModule,
        AiModule,
        LinksModule,
        HealthModule,
    ],
})
export class AppModule { }
