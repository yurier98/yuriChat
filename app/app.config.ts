const controlMotion = [
  'transition-[background-color,border-color,box-shadow,color,transform] duration-200 ease-out',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25',
].join(' ')

const buttonGlass = [
  'rounded-[1.25rem] backdrop-blur-xl',
  'shadow-[0_1px_2px_rgb(15_23_42_/_0.045),inset_0_1px_2px_rgb(15_23_42_/_0.055),inset_0_1px_0_rgb(255_255_255_/_0.74)]',
  'hover:-translate-y-px active:translate-y-0 active:scale-[0.985]',
  'disabled:shadow-none aria-disabled:shadow-none',
  'dark:shadow-[0_1px_2px_rgb(0_0_0_/_0.22),inset_0_1px_2px_rgb(255_255_255_/_0.055),inset_0_1px_0_rgb(255_255_255_/_0.12)]',
  controlMotion,
].join(' ')

const glassOutline = [
  'text-default ring-1 ring-inset !bg-white/50 !ring-white/85',
  '!shadow-[0_1px_2px_rgb(15_23_42_/_0.045),inset_0_1px_2px_rgb(15_23_42_/_0.065),inset_0_0_0_1px_rgb(255_255_255_/_0.46)]',
  'hover:!bg-white/68 hover:!shadow-[0_1px_3px_rgb(15_23_42_/_0.055),inset_0_1px_2px_rgb(15_23_42_/_0.06),inset_0_0_0_1px_rgb(255_255_255_/_0.58)] active:!bg-[#EAEAEE]/88',
  'dark:!bg-white/[0.095] dark:!ring-white/16 dark:!shadow-[0_1px_2px_rgb(0_0_0_/_0.20),inset_0_1px_2px_rgb(255_255_255_/_0.055),inset_0_0_0_1px_rgb(255_255_255_/_0.075)] dark:hover:!bg-white/[0.13] dark:active:!bg-white/[0.17]',
].join(' ')

const inputGlassBase = [
  'rounded-[1.25rem] backdrop-blur-xl',
  'shadow-[inset_0_1px_0_rgb(255_255_255_/_0.54),0_10px_30px_rgb(15_23_42_/_0.08)]',
  'dark:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.10),0_12px_36px_rgb(0_0_0_/_0.18)]',
  controlMotion,
].join(' ')

const inputGlassVariant = [
  'text-highlighted ring-1 ring-inset !bg-white/70 !ring-white/70',
  'hover:!bg-white/80 focus:!bg-white/85 focus:ring-2 focus:!ring-sky-500/25',
  'dark:!bg-white/[0.08] dark:!ring-white/10 dark:hover:!bg-white/[0.12] dark:focus:!bg-white/[0.14]',
].join(' ')

const floatingPanel = [
  '!rounded-[1.6rem] !bg-white/85 ring-1 !ring-white/70',
  'shadow-[0_24px_70px_rgb(15_23_42_/_0.16),inset_0_1px_0_rgb(255_255_255_/_0.72)]',
  'backdrop-blur-2xl dark:bg-neutral-950/85 dark:ring-white/10 dark:shadow-[0_28px_80px_rgb(0_0_0_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.10)]',
].join(' ')

const roundedFloatingItem = 'rounded-[1rem] before:rounded-[0.95rem]'

export default defineAppConfig({
  ui: {
    container: {
      base: 'max-w-3xl',
    },
    colors: {
      primary: 'sky',
      neutral: 'neutral',
    },
    fieldGroup: {
      variants: {
        orientation: {
          horizontal: 'inline-flex gap-1.5',
          vertical: 'flex flex-col gap-1.5',
        },
      },
    },
    button: {
      slots: {
        base: buttonGlass,
      },
      variants: {
        fieldGroup: {
          horizontal: 'focus-visible:z-[1]',
          vertical: 'focus-visible:z-[1]',
        },
        variant: {
          solid: 'ring-1 ring-inset ring-white/20',
          outline: glassOutline,
          soft: '!bg-white/48 !shadow-[0_1px_2px_rgb(15_23_42_/_0.04),inset_0_1px_2px_rgb(15_23_42_/_0.055),inset_0_0_0_1px_rgb(255_255_255_/_0.42)] hover:!bg-white/66 active:!bg-[#EAEAEE]/88 dark:!bg-white/[0.095] dark:!shadow-[0_1px_2px_rgb(0_0_0_/_0.18),inset_0_1px_2px_rgb(255_255_255_/_0.05)] dark:hover:!bg-white/[0.13] dark:active:!bg-white/[0.17]',
          subtle: glassOutline,
          ghost: 'shadow-none hover:!shadow-[0_1px_2px_rgb(15_23_42_/_0.045),inset_0_1px_2px_rgb(15_23_42_/_0.055),inset_0_0_0_1px_rgb(255_255_255_/_0.42)] hover:!bg-white/52 active:!bg-[#EAEAEE]/82 dark:hover:!bg-white/[0.12] dark:active:!bg-white/[0.16]',
          link: 'rounded-md shadow-none backdrop-blur-none hover:translate-y-0 active:scale-100',
        },
      },
    },
    input: {
      slots: {
        base: inputGlassBase,
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    textarea: {
      slots: {
        base: inputGlassBase,
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    inputNumber: {
      slots: {
        base: inputGlassBase,
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    inputTags: {
      slots: {
        base: inputGlassBase,
        item: 'rounded-[0.9rem] bg-white/75 ring-white/70 dark:bg-white/[0.10] dark:ring-white/10',
        itemDelete: 'rounded-full',
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 has-focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:has-focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    select: {
      slots: {
        base: inputGlassBase,
        content: floatingPanel,
        item: roundedFloatingItem,
      },
      variants: {
        fieldGroup: {
          horizontal: 'focus-visible:z-[1]',
          vertical: 'focus-visible:z-[1]',
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    selectMenu: {
      slots: {
        base: inputGlassBase,
        content: floatingPanel,
        item: roundedFloatingItem,
      },
      variants: {
        fieldGroup: {
          horizontal: 'focus-visible:z-[1]',
          vertical: 'focus-visible:z-[1]',
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    inputMenu: {
      slots: {
        base: inputGlassBase,
        content: floatingPanel,
        item: roundedFloatingItem,
        tagsItem: 'rounded-[0.9rem] bg-white/75 ring-white/70 dark:bg-white/[0.10] dark:ring-white/10',
        tagsItemDelete: 'rounded-full',
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: '',
          },
        },
        variant: {
          outline: inputGlassVariant,
          soft: inputGlassVariant,
          subtle: inputGlassVariant,
          ghost: '!bg-transparent hover:!bg-white/60 focus:!bg-white/75 has-focus:!bg-white/75 dark:hover:!bg-white/[0.08] dark:focus:!bg-white/[0.12] dark:has-focus:!bg-white/[0.12]',
          none: '!bg-transparent shadow-none backdrop-blur-none',
        },
      },
    },
    commandPalette: {
      slots: {
        input: '[&>input]:rounded-[1.25rem] [&>input]:!bg-white/70 [&>input]:!ring-white/70 [&>input]:backdrop-blur-xl dark:[&>input]:!bg-white/[0.08] dark:[&>input]:!ring-white/10',
        item: roundedFloatingItem,
        itemLabelBase: 'text-highlighted [&>mark]:rounded-md [&>mark]:bg-sky-500 [&>mark]:text-white',
        itemLabelSuffix: 'text-dimmed [&>mark]:rounded-md [&>mark]:bg-sky-500 [&>mark]:text-white',
      },
    },
    card: {
      slots: {
        root: 'rounded-[1.6rem]',
      },
    },
    modal: {
      slots: {
        content: floatingPanel,
      },
    },
    switch: {
      slots: {
        base: 'ring-1 ring-inset ring-white/70 data-[state=unchecked]:!bg-white/50 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.55),0_8px_24px_rgb(15_23_42_/_0.10)] backdrop-blur-xl data-[state=checked]:!bg-sky-500 data-[state=checked]:!ring-sky-400/60 dark:ring-white/10 dark:data-[state=unchecked]:!bg-white/[0.08]',
        thumb: '!bg-neutral-950 shadow-[0_3px_12px_rgb(15_23_42_/_0.24)] group-data-[state=checked]:!bg-sky-500 group-data-[state=checked]:shadow-[0_3px_14px_rgb(14_165_233_/_0.34)] dark:!bg-white dark:group-data-[state=checked]:!bg-sky-400',
      },
      variants: {
        color: {
          primary: {
            base: 'data-[state=checked]:!bg-sky-500 focus-visible:outline-sky-500',
            icon: 'group-data-[state=checked]:text-sky-500',
          },
        },
      },
    },
    checkbox: {
      slots: {
        base: 'rounded-[0.45rem] ring-white/70 bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.52)] backdrop-blur-xl dark:ring-white/10 dark:bg-white/[0.08]',
      },
    },
    kbd: {
      base: 'rounded-[0.6rem] bg-white/70 ring-1 ring-inset ring-white/70 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.6),0_4px_12px_rgb(15_23_42_/_0.08)] dark:bg-white/[0.08] dark:ring-white/10',
    },
  },
})
