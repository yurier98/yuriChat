export * from './chat'
export * from './lanyard'
export * from './location'
export * from './time'
export * from './weather'

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
  { label: 'Web', translation: 'tags.web' },
  { label: 'Python', translation: 'tags.python' },
] as const

export interface Social {
  label: string
  icon: string
  to: string
}

export const socials: readonly Social[] = [
  { label: 'yurierjesus@gmail.com', icon: 'i-ph-envelope-duotone', to: 'mailto:yurierjesus@gmail.com' },
  { label: 'GitHub', icon: 'i-logos-github-icon', to: 'https://github.com/yurier98' },
  { label: 'Website', icon: 'i-ph-globe-duotone', to: 'https://yurier98.github.io' },
  { label: 'Telegram', icon: 'i-simple-icons-telegram', to: 'https://t.me/yurierherrera' },
  { label: '+55 (41) 98756-8852', icon: 'i-ph-phone-duotone', to: 'tel:+5541987568852' },
]
