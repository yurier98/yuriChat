import process from 'node:process'
import { definePerson } from 'nuxt-schema-org/schema'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://yurier98.github.io'
const nitroPreset = process.env.NITRO_PRESET || 'vercel'

export default defineNuxtConfig({
  compatibilityDate: '2026-02-05',

  // Nuxt App
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      templateParams: {
        separator: '•',
      },
    },
    rootAttrs: {
      class: 'bg-[var(--ui-bg)]',
    },
  },

  css: ['~/assets/css/main.css'],

  // Nuxt Modules
  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/content', 'nuxt-studio', '@vueuse/nuxt', '@nuxtjs/google-fonts', '@nuxt/image', '@vueuse/motion/nuxt', '@pinia/nuxt', '@nuxtjs/i18n'],

  icon: {
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },

  ogImage: {
    enabled: false,
  },
  linkChecker: {
    enabled: false,
  },

  site: {
    url: siteUrl,
    name: 'Yurier Herrera',
    description: 'Software engineer and entrepreneur building user-centered, AI-assisted digital products.',
  },

  schemaOrg: {
    // The JSON-LD graph is ~2KB unminified, which makes unhead warn about the
    // inline script and ships dead bytes on every page. Google requires
    // structured data to be INLINE (an external .jsonld file is not supported),
    // so minifying is the only lever available.
    minify: true,
    identity: definePerson({
      // Basic Information, if applicable
      name: 'Yurier Herrera',
      givenName: 'Yurier',
      familyName: 'Herrera',

      // Profile Information, if applicable
      image: '/profile.webp',
      description: 'Software engineer and entrepreneur building user-centered digital products with AI and automation.',
      jobTitle: 'Software Engineer & Entrepreneur',
      url: siteUrl,
      sameAs: [
        'https://github.com/yurier98',
        'https://t.me/yurierherrera',
      ],
    }),
  },

  // Nuxt Content
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'python', 'ts', 'javascript', 'r'],
          theme: 'github-dark',
        },
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'mathml',
          },
        },
      },
    },
  },

  vite: {
    build: {
      sourcemap: false,
    },
  },

  // Nuxt SEO
  seo: {
    automaticTwitterTags: false,
  },

  // Nuxt Color Mode
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  // Nuxt Devtools
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  // Nuxt I18N
  i18n: {
    strategy: 'no_prefix',
    baseUrl: siteUrl,
    locales: [
      {
        label: 'English',
        code: 'en',
        language: 'en-US',
        icon: 'i-twemoji-flag-united-kingdom',
        file: 'en.json',
      },
      {
        label: 'Español',
        code: 'es',
        language: 'es-ES',
        icon: 'i-twemoji-flag-spain',
        file: 'es.json',
      },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    restructureDir: '',
  },

  // Nuxt Google Fonts
  googleFonts: {
    display: 'swap',
    families: {
      'Inter': [400, 500, 600, 700, 800, 900],
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
      'Dancing Script': [400, 700],
    },
  },

  // Nitro
  nitro: {
    experimental: {
      openAPI: true,
    },
    preset: nitroPreset,
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  studio: {
    // repository auto-detected from VERCEL_GIT_* env vars when deployed via Git
    repository: { provider: 'github', owner: 'yurier98', repo: 'yuriChat', branch: 'main' },
  },

  // Nuxt Env
  runtimeConfig: {
    discord: {
      userId: '',
      id: '',
      token: '',
    },
    public: {
      i18n: {
        baseUrl: siteUrl,
      },
    },
  },
})
