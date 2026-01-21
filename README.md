# Yurier Herrera - Personal Portfolio & AI Chat

A modern, interactive personal portfolio built with Nuxt 4, featuring an AI-powered chat interface, multilingual support, and dynamic content management.

## 🚀 Features

- **🤖 Interactive AI Chat**: Real-time chat interface with AI responses
- **🌍 Multilingual Support**: English and Spanish language support
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🎨 Modern UI**: Built with Nuxt UI components and smooth animations
- **📝 Content Management**: Dynamic content with Nuxt Content
- **⚡ Performance**: Optimized for speed with Nuxt 4 and Vite
- **🔍 SEO Optimized**: Built-in SEO with Nuxt SEO module
- **☁️ Cloudflare Ready**: Deploy-ready for Cloudflare Pages

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Nuxt UI](https://ui.nuxt.com/)
- **Content**: [Nuxt Content](https://content.nuxt.com/) for markdown management
- **Internationalization**: [Nuxt i18n](https://i18n.nuxtjs.org/)
- **Animations**: [VueUse Motion](https://motion.vueuse.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Icons**: [Iconify](https://iconify.design/) with multiple icon sets
- **Deployment**: Cloudflare Pages with D1 database

## 📦 Installation

Make sure you have Node.js 18+ installed, then clone and install dependencies:

```bash
# Clone the repository
git clone https://github.com/yourusername/yuriChat.git
cd yuriChat

# Install dependencies
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

## 🚀 Development

Start the development server:

```bash
# Using pnpm (recommended)
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build & Deploy

### Build for Production

```bash
# Build the application
pnpm build

# Preview production build locally
pnpm preview
```

### Deploy to Cloudflare Pages

This project is configured for Cloudflare Pages deployment:

1. Connect your repository to Cloudflare Pages
2. Set build command: `pnpm build`
3. Set output directory: `.output/public`
4. Configure environment variables if needed

## 📁 Project Structure

```
yuriChat/
├── app/
│   ├── components/          # Vue components
│   │   ├── chat/          # Chat-related components
│   │   ├── content/       # Content display components
│   │   ├── post/          # Post-related components
│   │   └── tool/            # Tool components
│   ├── composables/         # Vue composables
│   ├── pages/           # Application pages
│   └── stores/          # Pinia stores
├── content/             # Content files
│   ├── experiences/     # Work experience data
│   ├── projects/        # Project markdown files
│   ├── uses/           # Tech stack and tools
│   └── writings/       # Blog posts and articles
├── locales/            # Internationalization files
├── public/             # Static assets
└── server/             # Server-side API routes
```

## 🎨 Customization

### Adding New Content

1. **Projects**: Add markdown files to `content/projects/`
2. **Writings**: Add markdown files to `content/writings/`
3. **Experiences**: Add JSON files to `content/experiences/`
4. **Uses**: Add JSON files to `content/uses/`

### Styling

The project uses Tailwind CSS with custom CSS variables defined in `app/assets/css/main.css`. You can customize:

- Color scheme in CSS variables
- Typography with Google Fonts
- Component styles with Tailwind classes

### Internationalization

Add new languages by:

1. Creating new locale files in `locales/`
2. Updating the `i18n` configuration in `nuxt.config.ts`
3. Adding language-specific content

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Discord API (for activity status)
DISCORD_USER_ID=your_discord_user_id
DISCORD_ID=your_discord_id
DISCORD_TOKEN=your_discord_token

# WakaTime API (for coding stats)
WAKATIME_USER_ID=your_wakatime_user_id
WAKATIME_CODING=your_coding_stats
WAKATIME_EDITORS=your_editors_stats
WAKATIME_LANGUAGES=your_languages_stats
WAKATIME_OS=your_os_stats

# OpenWeather API (for weather widget)
OPENWEATHER_API_KEY=your_openweather_api_key
```

### API Routes

The project includes several API endpoints:

- `/api/activity` - Discord activity status
- `/api/stats` - WakaTime coding statistics  
- `/api/weather` - Weather information

## 📱 Features Overview

### Chat Interface
- Real-time AI chat functionality
- Message history and state management
- Smooth animations and transitions
- Command palette for quick actions

### Content Management
- Dynamic project showcase
- Blog posts and articles
- Work experience timeline
- Tech stack and tools showcase

### Performance
- Server-side rendering (SSR)
- Static site generation (SSG) support
- Image optimization with Nuxt Image
- Lazy loading and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yurier Herrera**
- Email: yurierjesus@gmail.com
- Website: [yurierherrera.nuxt.com](https://yurierherrera.nuxt.com)
- GitHub: [@yurierherrera](https://github.com/yurier98)

---

⭐ If you found this project helpful, please give it a star!