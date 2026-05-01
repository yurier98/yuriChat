<script lang="ts" setup>
import type { ChatMessage } from '~~/types'
import { ChatSender } from '~~/types'

const props = defineProps<{
  message: ChatMessage
}>()

const isAssistant = computed(() => props.message.sender === ChatSender.ASSISTANT)

const { t, locale } = useI18n({ useScope: 'global' })
const formatDate = computed(() => useDateFormat(props.message.createdAt, 'D MMMM YYYY, HH:mm', { locales: locale.value ?? 'en' }).value)
</script>

<template>
  <ChatMessageFrom v-if="isAssistant" :message="props.message" />
  <div v-else class="group flex flex-col items-end gap-2 duration-200">
    <div class="flex w-full justify-end">
      <div
        class="max-w-[82%] rounded-[1.65rem] rounded-br-[0.7rem] border border-white/20 bg-[#0A84FF] px-4 py-2.5 text-[15px] font-medium leading-snug text-white shadow-[0_10px_30px_rgba(10,132,255,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] sm:max-w-[68%] md:max-w-[58%]"
      >
        {{ t(message.content || '') }}
      </div>
    </div>
    <div class="flex justify-end text-xs text-muted opacity-0 duration-500 group-hover:opacity-80">
      {{ formatDate }}
    </div>
  </div>
</template>
