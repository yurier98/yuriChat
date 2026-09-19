<script lang="ts" setup>
interface ShareItem {
  label: string
  icon: string
  onSelect: () => void
}

const props = defineProps<{
  title?: string
  label?: string
}>()

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()

const url = useRequestURL().href

function openExternal(link: string) {
  window.open(link, '_blank', 'noopener,noreferrer')
}

async function copyLink() {
  await navigator.clipboard.writeText(url)
  toast.add({
    title: t('share.copied'),
    color: 'success',
  })
}

const items = computed<ShareItem[]>(() => [
  {
    label: t('share.x'),
    icon: 'i-simple-icons-x',
    onSelect: () => openExternal(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(props.title ?? '')}`),
  },
  {
    label: t('share.linkedin'),
    icon: 'i-simple-icons-linkedin',
    onSelect: () => openExternal(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`),
  },
  {
    label: t('share.whatsapp'),
    icon: 'i-simple-icons-whatsapp',
    onSelect: () => openExternal(`https://wa.me/?text=${encodeURIComponent(`${props.title ?? ''} ${url}`)}`),
  },
  {
    label: t('share.telegram'),
    icon: 'i-simple-icons-telegram',
    onSelect: () => openExternal(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(props.title ?? '')}`),
  },
  {
    label: t('share.copy'),
    icon: 'i-ph-link-duotone',
    onSelect: () => {
      void copyLink()
    },
  },
])
</script>

<template>
  <UDropdownMenu :items="items">
    <UTooltip
      :text="label ?? t('share.label')"
      :content="{ side: 'bottom', align: 'end' }"
    >
      <UButton
        :label="label ?? t('share.label')"
        icon="i-ph-share-network-duotone"
        variant="ghost"
        color="neutral"
        size="lg"
        class="rounded-full"
        :aria-label="label ?? t('share.label')"
      />
    </UTooltip>
  </UDropdownMenu>
</template>
