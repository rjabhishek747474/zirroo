import { Injectable } from '@nestjs/common';

@Injectable()
export class LinksService {
    async getPreview(url: string) {
        try {
            // Simple URL metadata fetch
            const response = await fetch(url);
            const html = await response.text();

            // Extract basic metadata using regex
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
            const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);

            return {
                url,
                title: titleMatch ? titleMatch[1].trim() : null,
                description: descMatch ? descMatch[1].trim() : null,
                image: imageMatch ? imageMatch[1].trim() : null,
            };
        } catch (error) {
            console.error('Link preview error:', error);
            return { url, title: null, description: null, image: null };
        }
    }
}
