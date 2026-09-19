import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineOgImageSchema, defineRobotsSchema, defineSchemaOrgSchema, defineSitemapSchema } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        slug: z.string(),
        locale: z.enum(['en', 'es']).optional(),
        title: z.string(),
        description: z.string(),
        publishedAt: z.string(),
        readingTime: z.number().optional(),
        tags: z.array(z.string()),
        cover: z.string(),
        favorite: z.boolean().optional(),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      }),
    }),
    writings: defineCollection({
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
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      }),
    }),
    usesCategories: defineCollection({
      type: 'data',
      source: 'uses/categories/*.json',
      schema: z.object({
        slug: z.string(),
        name: z.object({
          en: z.string(),
          es: z.string(),
        }),
      }),
    }),
    uses: defineCollection({
      type: 'data',
      source: 'uses/*.json',
      schema: z.object({
        name: z.string(),
        description: z.object({
          en: z.string(),
          es: z.string(),
        }),
        category: z.string(),
      }),
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills.json',
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          name: z.object({
            en: z.string(),
            es: z.string(),
          }),
          items: z.array(z.object({
            name: z.union([z.string(), z.object({
              en: z.string(),
              es: z.string(),
            })]),
            icon: z.string().optional(),
          })),
        })),
      }),
    }),
    experiences: defineCollection({
      type: 'data',
      source: 'experiences/*.json',
      schema: z.object({
        title: z.object({
          en: z.string(),
          es: z.string(),
        }),
        company: z.string(),
        companyUrl: z.string().url().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        location: z.string(),
        description: z.object({
          en: z.string(),
          es: z.string(),
        }),
        tags: z.array(z.string()),
      }),
    }),
    education: defineCollection({
      type: 'data',
      source: 'education/*.json',
      schema: z.object({
        kind: z.enum(['degree', 'certification', 'course']),
        title: z.object({
          en: z.string(),
          es: z.string(),
        }),
        institution: z.string().optional(),
        institutionUrl: z.string().url().optional(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        credentialUrl: z.string().url().optional(),
        description: z.object({
          en: z.string(),
          es: z.string(),
        }).optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
