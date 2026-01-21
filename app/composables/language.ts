export function useLanguage() {
  const { setLocale } = useI18n({ useScope: 'global' })

  async function changeLocale(newLocale: string) {
    await setLocale(newLocale as 'en' | 'fr' | 'es')
  }

  return {
    changeLocale,
  }
}
