<script lang="ts" setup>
import type { ChatFetchState } from '~~/types'
import { ChatState } from '~~/types'

const props = defineProps<{ messageId: number, fetchStates: ChatFetchState[] }>()
const currentState = ref<ChatFetchState | undefined>(props.fetchStates[0] ?? undefined)
const { setLoadingState } = useChatStore()
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  let index = 0
  function nextState() {
    index++
    if (index < props.fetchStates.length) {
      const delay = Math.random() * 1050 + 400
      setTimeout(() => {
        currentState.value = props.fetchStates[index]
        nextState()
      }, delay)
    }
    else {
      setLoadingState(props.messageId, ChatState.SENT)
    }
  }
  if (props.fetchStates.length > 1) {
    nextState()
  }
  else {
    setLoadingState(props.messageId, ChatState.SENT)
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <UIcon name="i-ph-spinner-duotone" class="animate-spin" />
    <span
      class="relative inline-block overflow-hidden animate-shine italic bg-[linear-gradient(110deg,#bfbfbf,35%,#000,50%,#bfbfbf,75%,#bfbfbf)] dark:bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-transparent"
    >
      <slot>{{ t(currentState || '') }}</slot>
    </span>
  </div>
</template>

<style scoped>
.animate-shine {
  animation: shine 2s linear infinite;
}

@keyframes shine {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
