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
  content: 'bg-default-30 dark:bg-default/70 backdrop-blur-xl border border-accented/70 max-w-2xl h-100 flex flex-col shadow-raycast',
}

const commandPaletteUi = {
  root: 'flex flex-col h-full',
  label: 'text-muted font-medium',
  item: 'data-highlighted:not-data-disabled:before:bg-muted',
  content: 'flex-1 overflow-y-auto',
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
    class="fixed z-50 mb-4 duration-700 mx-auto px-8 sm:px-0 flex gap-2"
    :class="active || mode === 'work' ? 'bottom-0 left-1/2 -translate-x-1/2' : 'max-w-[40rem] w-full md:bottom-2 left-1/2 -translate-x-1/2 bottom-0'"
  >
    <UCard variant="outline" class="rounded-xl shadow-lg w-full" :ui="{ body: 'p-2 sm:p-2 flex gap-2 w-full' }">
      <UFieldGroup v-if="mode === 'chat'" class="w-full">
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
              class="rounded-lg cursor-pointer p-2 w-full justify-center"
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
              class="rounded-lg"
              :class="storeMessages.length !== 0 ? 'cursor-pointer' : 'cursor-default'"
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
      </UFieldGroup>
      <UFieldGroup v-else>
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
            class="rounded-lg cursor-pointer p-2 w-full justify-center"
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
            class="rounded-lg cursor-pointer p-2 w-full justify-center"
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
            class="rounded-lg cursor-pointer p-2 w-full justify-center"
            href="/projects"
          />
        </UTooltip>
      </UFieldGroup>
      <ClientOnly>
        <UFieldGroup class="flex items-center justify-center">
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
              class="cursor-pointer"
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
              class="cursor-pointer"
              size="xl"
              @click.prevent="changeLocale(locale === 'en' ? 'fr' : locale === 'fr' ? 'es' : 'en')"
            />
          </UTooltip>
        </UFieldGroup>
      </ClientOnly>
    </UCard>
  </nav>
</template>
