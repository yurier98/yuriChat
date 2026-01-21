<script lang="ts" setup>
import { ChatType } from '~~/types'

const props = defineProps<{
  type: ChatType
}>()

const category = computed(() => {
  switch (props.type) {
    case ChatType.HARDWARE:
      return 'hardware'
    case ChatType.SOFTWARE:
      return 'software'
    case ChatType.HOMELAB:
      return 'homelab'
    case ChatType.IDE:
      return 'ide'
    default:
      return 'unknown'
  }
})
</script>

<template>
  <ToolUses :category="category" />
</template>
