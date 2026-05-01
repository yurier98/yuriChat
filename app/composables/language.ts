export function useLanguage() {
  const { setLocale } = useI18n({ useScope: 'global' })
  const supportedLocales = new Set(['en', 'es'])

  async function changeLocale(newLocale: string) {
    if (!supportedLocales.has(newLocale))
      return
    await setLocale(newLocale as 'en' | 'fr' | 'es')
  }

  return {
    changeLocale,
  }
}
