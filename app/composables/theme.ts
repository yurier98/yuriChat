export function useTheme() {
  const colorMode = useColorMode()

  const isDark = computed({
    get: () => colorMode.value === 'dark',
    set: (val: boolean) => {
      colorMode.preference = val ? 'dark' : 'light'
    },
  })
  const dark = computed({
    get: () => colorMode.value === 'dark',
    set: () => {},
  })

  function toggleDark(event: MouseEvent | { clientX: number, clientY: number }) {
  // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
      isDark.value = !isDark.value
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })
    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: colorMode.value === 'dark'
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            pseudoElement: colorMode.value === 'dark'
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
  }

  return {
    isDark,
    dark,
    toggleDark,
  }
}
