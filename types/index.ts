export * from './chat'
export * from './lanyard'
export * from './location'
export * from './openweather'
export * from './time'
export * from './wakatime'

export const IDEs = [
  { name: 'Visual Studio Code', icon: 'i-logos:visual-studio-code' },
  { name: 'IntelliJ IDEA Ultimate', icon: 'i-logos:intellij-idea' },
  { name: 'WebStorm', icon: 'i-logos:webstorm' },
  { name: 'PyCharm Professional', icon: 'i-logos:pycharm' },
  { name: 'Cursor', icon: 'i-vscode-icons-file-type-cursorrules' },
] as const

export interface Tag {
  label: string
  title?: string
  translation: string
}

export const TAGS: readonly Tag[] = [
  { label: 'R', translation: 'tags.r' },
  { label: 'AI', translation: 'tags.ai' },
  { label: 'Data', translation: 'tags.data' },
  { label: 'Web', translation: 'tags.web' },
  { label: 'Python', translation: 'tags.python' },
  { label: 'Maths', translation: 'tags.maths' },
] as const

export const socials = [
  { icon: 'i-ph:x-logo-duotone', label: 'Twitter', to: 'https://go.arthurdanjou.fr/twitter' },
  { icon: 'i-ph:github-logo-duotone', label: 'GitHub', to: 'https://go.arthurdanjou.fr/github' },
  { icon: 'i-ph:linkedin-logo-duotone', label: 'LinkedIn', to: 'https://go.arthurdanjou.fr/linkedin' },
  { icon: 'i-ph:discord-logo-duotone', label: 'Discord', to: 'https://go.arthurdanjou.fr/discord' },
  { icon: 'i-ph-envelope-duotone', label: 'Email', to: 'https://go.arthurdanjou.fr/mail-perso' },
] as const
