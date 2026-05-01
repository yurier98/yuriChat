import { definePerson } from 'nuxt-schema-org/schema'

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
  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/content', '@vueuse/nuxt', '@nuxtjs/google-fonts', '@nuxt/image', '@vueuse/motion/nuxt', '@pinia/nuxt', '@nuxtjs/i18n'],

  icon: {
    serverBundle: 'local',
  },

  ogImage: {
    enabled: false,
  },
  linkChecker: {
    enabled: false,
  },

  site: {
    url: 'https://yurierherrera.nuxt.com',
    name: 'Developer enjoying Artificial Intelligence and Machine Learning. Mathematics Student at Paris Dauphine-PSL University specialised in Statistics and Data Science.',
  },

  schemaOrg: {
    identity: definePerson({
      // Basic Information, if applicable
      name: 'Yurier Herrera',
      givenName: 'Yurier',
      familyName: 'Herrera',

      // Profile Information, if applicable
      image: '/yurier.jpeg',
      description: 'AI researcher and technical author specializing in machine learning and neural networks',
      jobTitle: 'Principal AI Researcher',
      url: 'https://yurierherrera.nuxt.com',
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
    baseUrl: 'https://yurierherrera.nuxt.com',
    locales: [
      {
        label: 'English',
        code: 'en',
        language: 'en-EN',
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
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  // Nuxt Env
  runtimeConfig: {
    discord: {
      userId: '',
      id: '',
      token: '',
    },
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: '',
    },
    openWeather: {
      apiKey: '',
    },
    public: {
      i18n: {
        baseUrl: 'https://yurierherrera.nuxt.com',
      },
    },
  },
})
