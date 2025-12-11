import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { WinstonLogger } from './common/logger/winston.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new WinstonLogger(),
    });

    const configService = app.get(ConfigService);

    // Security
    app.use(helmet());

    // CORS
    app.enableCors({
        origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
        credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // API prefix
    app.setGlobalPrefix('api');

    const port = configService.get('PORT') || 3001;

    await app.listen(port);

    console.log(`
╔═══════════════════════════════════════════════════╗
║             ListShare API Server                   ║
╠═══════════════════════════════════════════════════╣
║  🚀 Server running on: http://localhost:${port}        ║
║  📚 Environment: ${configService.get('NODE_ENV') || 'development'}                   ║
║                                                   ║
║  Endpoints:                                       ║
║  - GET  /api/health                               ║
║  - GET  /api/lists                                ║
║  - POST /api/lists                                ║
║  - GET  /api/lists/:id                            ║
║  - PUT  /api/lists/:id                            ║
║  - DELETE /api/lists/:id                          ║
║  - POST /api/lists/:id/like                       ║
║  - POST /api/lists/:id/save                       ║
║  - POST /api/ai/chat                              ║
║  - POST /api/ai/embed                             ║
╚═══════════════════════════════════════════════════╝
  `);
}

bootstrap();
