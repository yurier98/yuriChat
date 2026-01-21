import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'projects/*.md',
        schema: z.object({
          slug: z.string(),
          title: z.string(),
          description: z.string(),
          publishedAt: z.string(),
          readingTime: z.number().optional(),
          tags: z.array(z.string()),
          cover: z.string(),
          favorite: z.boolean().optional(),
        }),
      }),
    ),
    writings: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'writings/*.md',
        schema: z.object({
          slug: z.string(),
          title: z.string(),
          description: z.string(),
          publishedAt: z.string(),
          readingTime: z.number(),
          cover: z.string().optional(),
          tags: z.array(z.string()),
        }),
      }),
    ),
    usesCategories: defineCollection(
      asSeoCollection({
        type: 'data',
        source: 'uses/categories/*.json',
        schema: z.object({
          slug: z.string(),
          name: z.object({
            en: z.string(),
            fr: z.string(),
            es: z.string(),
          }),
        }),
      }),
    ),
    uses: defineCollection(
      asSeoCollection({
        type: 'data',
        source: 'uses/*.json',
        schema: z.object({
          name: z.string(),
          description: z.object({
            en: z.string(),
            fr: z.string(),
            es: z.string(),
          }),
          category: z.string(),
        }),
      }),
    ),
    skills: defineCollection(
      asSeoCollection({
        type: 'data',
        source: 'skills.json',
        schema: z.object({
          body: z.array(z.object({
            id: z.string(),
            name: z.object({
              en: z.string(),
              fr: z.string(),
              es: z.string(),
            }),
            items: z.array(z.object({
              name: z.string(),
              icon: z.string(),
            })),
          })),
        }),
      }),
    ),
    experiences: defineCollection(
      asSeoCollection({
        type: 'data',
        source: 'experiences/*.json',
        schema: z.object({
          title: z.object({
            en: z.string(),
            fr: z.string(),
            es: z.string(),
          }),
          company: z.string(),
          companyUrl: z.string().url().optional(),
          startDate: z.string(),
          endDate: z.string().optional(),
          location: z.string(),
          description: z.object({
            en: z.string(),
            fr: z.string(),
            es: z.string(),
          }),
          tags: z.array(z.string()),
        }),
      }),
    ),
  },
})
