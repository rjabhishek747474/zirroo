import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

class ChatDto {
    message: string;
    context?: {
        listTitle?: string;
        items?: string[];
    };
}

class SuggestDto {
    listTitle: string;
    existingItems: string[];
}

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('chat')
    async chat(@Body() chatDto: ChatDto) {
        return this.aiService.chat(chatDto.message, chatDto.context);
    }

    @Post('suggest')
    async suggest(@Body() suggestDto: SuggestDto) {
        const suggestions = await this.aiService.suggestItems(
            suggestDto.listTitle,
            suggestDto.existingItems,
        );
        return { suggestions };
    }

    @Post('embed')
    async embed(@Body('text') text: string) {
        const embedding = await this.aiService.generateEmbedding(text);
        return { embedding };
    }
}
