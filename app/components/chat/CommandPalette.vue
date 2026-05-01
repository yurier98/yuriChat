<script lang="ts" setup>
import type { CommandPaletteItem } from '@nuxt/ui'
import { ChatState } from '~~/types'

interface Props {
  mode?: 'chat' | 'work'
  active: boolean
}

withDefaults(defineProps<Props>(), {
  mode: 'chat',
})

const searchTerm = ref('')
const openMessageModal = ref(false)
const openClearModal = ref(false)

const { t, locale } = useI18n({ useScope: 'global' })
const { messages, submitMessage } = useChat()
const { clearMessages, messages: storeMessages } = useChatStore()

const loading = computed(() => storeMessages.some(msg => msg.state === ChatState.LOADING))

function handleDelete() {
  clearMessages()
  openClearModal.value = false
}

function onSelect(item: CommandPaletteItem) {
  searchTerm.value = ''
  openMessageModal.value = false
  submitMessage(item.type, item.prompt, item.fetchStates ?? [])
}

const { changeLocale } = useLanguage()
const { dark, toggleDark } = useTheme()

defineShortcuts({
  meta_enter: () => openMessageModal.value = !openMessageModal.value,
  enter: () => openMessageModal.value = !openMessageModal.value,
  meta_k: () => openMessageModal.value = !openMessageModal.value,
  meta_d: () => openClearModal.value = !openClearModal.value,
  l: () => changeLocale(locale.value === 'en' ? 'es' : locale.value === 'es' ? 'es' : 'en'),
  t: () => toggleDark({ clientX: window.innerWidth / 2, clientY: window.innerHeight }),
})

const isMobile = computed(() => {
  if (!import.meta.client)
    return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
})
const activeElement = useActiveElement()
watch(openMessageModal, async () => {
  await nextTick()
  if (activeElement.value instanceof HTMLElement && isMobile.value) {
    activeElement.value.blur()
  }
})

const modalUi = {
  content: 'max-w-2xl h-100 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/70 !bg-white/78 !ring-1 !ring-black/5 shadow-[0_24px_80px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl dark:!border-neutral-700/70 dark:!bg-neutral-950/78 dark:!ring-neutral-700/60 dark:shadow-[0_28px_90px_rgba(0,0,0,0.46),0_0_0_1px_rgba(63,63,70,0.38),inset_0_1px_0_rgba(82,82,91,0.32)]',
}

const dockCardClass = [
  'relative isolate w-full overflow-hidden rounded-[2rem]',
  'border border-white/48 !bg-white/16',
  '!ring-1 !ring-white/50 backdrop-blur-[34px] backdrop-saturate-200 backdrop-contrast-125',
  'shadow-[0_18px_54px_rgba(15,23,42,0.16),0_2px_12px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.86),inset_0_-1px_0_rgba(15,23,42,0.10)]',
  'before:pointer-events-none before:absolute before:inset-[1px] before:z-0 before:rounded-[1.9rem] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.44),rgba(213,219,229,0.26)_46%,rgba(255,255,255,0.12)),radial-gradient(circle_at_24%_0%,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_86%_100%,rgba(148,163,184,0.18),transparent_42%)] before:content-[""]',
  'after:pointer-events-none after:absolute after:inset-0 after:z-0 after:rounded-[2rem] after:bg-[linear-gradient(120deg,rgba(255,255,255,0.42),transparent_30%,rgba(255,255,255,0.12)_62%,rgba(15,23,42,0.06))] after:mix-blend-overlay after:content-[""]',
  'dark:border-white/12 dark:!bg-white/[0.055] dark:!ring-white/12 dark:shadow-[0_18px_54px_rgba(0,0,0,0.34),0_2px_12px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.28)] dark:before:bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(39,39,42,0.40)_48%,rgba(255,255,255,0.05)),radial-gradient(circle_at_26%_0%,rgba(255,255,255,0.18),transparent_36%)] dark:after:bg-[linear-gradient(120deg,rgba(255,255,255,0.13),transparent_32%,rgba(255,255,255,0.05)_64%,rgba(0,0,0,0.18))]',
].join(' ')

const dockButtonClass = [
  'cursor-pointer rounded-[1.45rem]',
  '!bg-white/22 !ring-1 !ring-inset !ring-white/58',
  '!shadow-[0_1px_2px_rgba(15,23,42,0.045),inset_0_1px_0_rgba(255,255,255,0.58),inset_0_-1px_0_rgba(15,23,42,0.055)]',
  'hover:!bg-white/36 hover:!ring-white/76',
  'active:!bg-white/44',
  'dark:!bg-white/[0.07] dark:!ring-white/12 dark:!shadow-[0_1px_2px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.09)] dark:hover:!bg-white/[0.11] dark:hover:!ring-white/18 dark:active:!bg-white/[0.15]',
].join(' ')

const dockDestructiveButtonClass = [
  dockButtonClass,
  '!bg-red-500/10 !ring-red-200/65 text-red-500',
  'hover:!bg-red-500/16 hover:!ring-red-200/80',
  'disabled:!bg-white/24 disabled:!ring-white/48 disabled:text-dimmed',
  'dark:!bg-red-500/12 dark:!ring-red-300/18 dark:hover:!bg-red-500/16 dark:disabled:!bg-white/[0.06] dark:disabled:!ring-white/10',
].join(' ')

const commandPaletteUi = {
  root: 'flex h-full min-h-0 flex-col !bg-transparent text-default divide-y divide-black/10 dark:divide-white/10',
  input: '[&>input]:h-14 [&>input]:rounded-none [&>input]:!bg-white/12 [&>input]:text-highlighted [&>input]:placeholder:text-muted [&>input]:backdrop-blur-xl dark:[&>input]:!bg-white/[0.035] dark:[&>input]:text-white dark:[&>input]:placeholder:text-neutral-500',
  close: 'rounded-full !bg-white/60 !ring-1 !ring-black/5 shadow-[0_8px_24px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl hover:!bg-white/75 dark:!bg-white/[0.08] dark:!ring-white/10 dark:text-white dark:hover:!bg-white/[0.13]',
  content: 'flex-1 min-h-0 overflow-hidden !bg-white/28 dark:!bg-white/[0.025]',
  viewport: 'flex-1 overflow-y-auto scroll-py-2 divide-y divide-black/10 dark:divide-white/10',
  group: 'p-2 isolate',
  label: 'px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400',
  item: 'rounded-[1.25rem] p-2 text-neutral-700 before:rounded-[1.15rem] data-highlighted:not-data-disabled:text-neutral-950 data-highlighted:not-data-disabled:before:bg-white/65 data-highlighted:not-data-disabled:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_24px_rgba(15,23,42,0.08)] dark:text-neutral-300 dark:data-highlighted:not-data-disabled:text-white dark:data-highlighted:not-data-disabled:before:bg-white/[0.10] dark:data-highlighted:not-data-disabled:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.18)]',
  itemLeadingIcon: 'text-neutral-500 group-data-highlighted:not-group-data-disabled:text-sky-500 dark:text-neutral-400 dark:group-data-highlighted:not-group-data-disabled:text-sky-400',
  itemLabelBase: 'text-highlighted dark:text-white [&>mark]:rounded-md [&>mark]:bg-sky-500 [&>mark]:text-white',
  itemLabelSuffix: 'text-neutral-500 dark:text-neutral-400 [&>mark]:rounded-md [&>mark]:bg-sky-500 [&>mark]:text-white',
  footer: 'border-t border-black/10 bg-white/24 p-2 dark:border-white/10 dark:bg-white/[0.035]',
}

const toolTipContent = {
  align: 'center',
  side: 'top',
  sideOffset: 0,
} as any

const router = useRouter()
function goHome() {
  clearMessages()
  router.push('/')
}

const route = useRoute()
function isRoute(name: string): boolean {
  return route.path.includes(name) && route.name !== '/'
}
</script>

<template>
  <nav
    class="fixed z-50 mb-4 duration-700 mx-auto px-5 sm:px-0 flex gap-2"
    :class="active || mode === 'work' ? 'bottom-0 left-1/2 -translate-x-1/2' : 'max-w-[40rem] w-full md:bottom-2 left-1/2 -translate-x-1/2 bottom-0'"
  >
    <UCard
      variant="outline"
      :class="dockCardClass"
      :ui="{ body: 'relative z-10 p-1.5 sm:p-1.5 flex gap-1.5 w-full' }"
    >
      <div v-if="mode === 'chat'" class="flex w-full gap-1">
        <UModal v-model:open="openMessageModal" :ui="modalUi" title="Hey" description="Hey">
          <UTooltip
            :text="t('palette.tooltip.send')"
            arrow
            :content="toolTipContent"
            :kbds="['enter']"
            :delay-duration="0"
          >
            <UButton
              :label="loading ? t('palette.cmd.sending') : t('palette.cmd.send')"
              variant="outline"
              color="neutral"
              size="xl"
              icon="i-ph-paper-plane-tilt-duotone"
              class="w-full justify-center p-2"
              :class="dockButtonClass"
              :disabled="loading"
            >
              <template #trailing>
                <div class="hidden md:flex px-2 items-center">
                  <UKbd value="enter" variant="subtle" />
                </div>
              </template>
            </UButton>
          </UTooltip>

          <template #content>
            <UCommandPalette
              close
              :ui="commandPaletteUi"
              :groups="messages"
              icon="i-ph-paper-plane-tilt-duotone"
              :autofocus="false"
              :placeholder="t('palette.cmd.placeholder')"
              @update:model-value="onSelect"
              @update:open="openMessageModal = $event"
            >
              <template #item="{ item }">
                <div class="relative flex flex-col sm:flex-row items-start sm:justify-between sm:items-center w-full cursor-pointer my-1">
                  <div class="absolute inset-0 -m-1" />
                  <div class="flex items-center gap-2.5">
                    <UIcon :name="item.icon!" size="20" />
                    <span>{{ t(item.label || '') }}</span>
                  </div>
                  <div class="text-dimmed text-xs font-medium text-start">
                    {{ t(item.prompt) }}
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-1">
                    <UIcon name="i-simple-icons-nuxtdotjs" class="size-5 ml-1 text-green-500" />
                    <p class="text-xs font-medium text-dimmed">
                      {{ t('main.powered') }}
                    </p>
                  </div>
                  <div class="flex items-center gap-1">
                    <UButton color="neutral" variant="ghost" :label="t('palette.cmd.send')" class="text-dimmed" size="xs">
                      <template #trailing>
                        <UKbd size="lg" value="enter" color="info" />
                      </template>
                    </UButton>
                  </div>
                </div>
              </template>
            </UCommandPalette>
          </template>
        </UModal>
        <UModal
          v-if="active"
          v-model:open="openClearModal"
          :title="t('palette.clear.title')"
          :description="t('palette.clear.description')"
        >
          <UTooltip
            :text="t('palette.tooltip.clear')"
            arrow
            :content="toolTipContent"
            :kbds="['meta', 'D']"
            :delay-duration="0"
          >
            <UButton
              variant="subtle"
              color="error"
              leading-icon="i-ph-trash-duotone"
              size="xl"
              :class="[
                dockDestructiveButtonClass,
                {
                  'cursor-pointer': storeMessages.length !== 0,
                  'cursor-default': storeMessages.length === 0,
                },
              ]"
              :disabled="storeMessages.length === 0"
            />
          </UTooltip>

          <template #footer="{ close }">
            <UFieldGroup>
              <UButton :label="t('palette.clear.cancel')" color="neutral" variant="outline" @click="close" />
              <UButton :label="t('palette.clear.submit')" color="error" @click.prevent="handleDelete()" />
            </UFieldGroup>
          </template>
        </UModal>
      </div>
      <div v-else class="flex gap-1">
        <UTooltip
          :text="t('palette.tooltip.chat')"
          arrow
          :content="toolTipContent"
          :delay-duration="0"
        >
          <UButton
            :label="t('palette.cmd.chat')"
            variant="outline"
            color="neutral"
            size="xl"
            icon="i-ph-house-duotone"
            class="w-full justify-center p-2"
            :class="dockButtonClass"
            @click.prevent="goHome"
          />
        </UTooltip>
        <UTooltip
          v-if="isRoute('/projects')"
          :text="t('palette.tooltip.writings')"
          arrow
          :content="toolTipContent"
          :delay-duration="0"
        >
          <UButton
            :label="t('palette.cmd.writings')"
            variant="outline"
            color="neutral"
            size="xl"
            icon="i-ph-books-duotone"
            class="w-full justify-center p-2"
            :class="dockButtonClass"
            href="/writings"
          />
        </UTooltip>
        <UTooltip
          v-if="isRoute('/writings')"
          :text="t('palette.tooltip.projects')"
          arrow
          :content="toolTipContent"
          :delay-duration="0"
        >
          <UButton
            :label="t('palette.cmd.projects')"
            variant="outline"
            color="neutral"
            size="xl"
            icon="i-ph-code-duotone"
            class="w-full justify-center p-2"
            :class="dockButtonClass"
            href="/projects"
          />
        </UTooltip>
      </div>
      <ClientOnly>
        <div class="flex items-center justify-center gap-1">
          <UTooltip
            :text="t('palette.tooltip.theme')"
            arrow
            :content="toolTipContent"
            :kbds="['T']"
            :delay-duration="0"
          >
            <UButton
              :icon="dark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
              color="neutral"
              variant="outline"
              aria-label="Toggle dark mode"
              :class="dockButtonClass"
              size="xl"
              @click.prevent="toggleDark"
            />
          </UTooltip>
          <UTooltip
            :text="t('palette.tooltip.language')"
            arrow
            :content="toolTipContent"
            :kbds="['L']"
            :delay-duration="0"
          >
            <UButton
              icon="i-ph-translate-duotone"
              color="neutral"
              variant="outline"
              aria-label="Change language"
              :class="dockButtonClass"
              size="xl"
              @click.prevent="changeLocale(locale === 'en' ? 'es' : locale === 'es' ? 'en' : 'es')"
            />
          </UTooltip>
        </div>
      </ClientOnly>
    </UCard>
  </nav>
</template>
