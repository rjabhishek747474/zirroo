import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
    private genAI: GoogleGenerativeAI;
    private model;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        }
    }

    async chat(message: string, context?: { listTitle?: string; items?: string[] }) {
        if (!this.model) {
            return { response: 'AI service not configured. Please add GEMINI_API_KEY.' };
        }

        const systemPrompt = context?.listTitle
            ? `You are a helpful AI assistant for Zirroo. The user is viewing a list called "${context.listTitle}" with items: ${context.items?.join(', ')}. Help them with questions about this list.`
            : 'You are a helpful AI assistant for Zirroo, a social platform for sharing curated lists. Help users discover, create, and manage their lists.';

        try {
            const result = await this.model.generateContent([
                { text: systemPrompt },
                { text: message },
            ]);

            return { response: result.response.text() };
        } catch (error) {
            console.error('AI chat error:', error);
            return { response: 'Sorry, I encountered an error. Please try again.' };
        }
    }

    async generateEmbedding(text: string): Promise<number[]> {
        if (!this.genAI) {
            throw new Error('AI service not configured');
        }

        try {
            const embeddingModel = this.genAI.getGenerativeModel({ model: 'embedding-001' });
            const result = await embeddingModel.embedContent(text);
            return result.embedding.values;
        } catch (error) {
            console.error('Embedding error:', error);
            throw error;
        }
    }

    async suggestItems(listTitle: string, existingItems: string[]): Promise<string[]> {
        if (!this.model) {
            return [];
        }

        try {
            const prompt = `Given a list titled "${listTitle}" with existing items: ${existingItems.join(', ')}. Suggest 3 more items that would fit well in this list. Return only the item names, one per line.`;

            const result = await this.model.generateContent(prompt);
            const suggestions = result.response.text().split('\n').filter(Boolean).slice(0, 3);
            return suggestions;
        } catch (error) {
            console.error('Suggestion error:', error);
            return [];
        }
    }
}
