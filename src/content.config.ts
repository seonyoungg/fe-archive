import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				presentation: z
					.object({
						session: z.number().int().positive(),
						part: z.number().int().min(1).max(2).default(1),
						date: z.coerce.date(),
						speaker: z.string(),
						topics: z.array(z.string()).min(1).max(3),
						tags: z.array(z.string()).min(1),
					})
					.optional(),
			}),
		}),
	}),
	topics: defineCollection({
		loader: file('src/data/Topics.yaml'),
		schema: z.object({ id: z.string(), name: z.string(), description: z.string() }),
	}),
};
