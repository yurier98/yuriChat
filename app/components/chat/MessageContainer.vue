<script lang="ts" setup>
import type { ChatMessage } from '~~/types'
import { ChatSender } from '~~/types'

const props = defineProps<{
  message: ChatMessage
}>()

const isArthur = computed(() => props.message.sender === ChatSender.ARTHUR)

const { t, locale } = useI18n({ useScope: 'global' })
const formatDate = computed(() => useDateFormat(props.message.createdAt, 'D MMMM YYYY, HH:mm', { locales: locale.value ?? 'en' }).value)
</script>

<template>
  <ChatMessageFromArthur v-if="isArthur" :message="props.message" />
  <div v-else class="group flex flex-col gap-2 duration-200">
    <div class="flex flex-col-reverse md:flex-row-reverse items-end">
      <UCard
        variant="solid"
        class="rounded-xl mt-1 bg-sky-600 text-neutral-100 md:max-w-3/4 font-medium"
        :ui="{ body: 'sm:p-2', header: 'sm:p-2', footer: 'sm:p-2' }"
      >
        {{ t(message.content || '') }}
      </UCard>
    </div>
    <div class="text-muted-foreground opacity-0 group-hover:opacity-80 duration-500 flex text-xs italic justify-end">
      {{ formatDate }}
    </div>
  </div>
</template>
