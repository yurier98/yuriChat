<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

const title = computed(() => t('chat.welcome'))
const typingStyle = computed(() => ({
  '--typing-characters': `${title.value.length}`,
  '--typing-width': `${title.value.length}ch`,
}))
</script>

<template>
  <section class="flex flex-col items-center justify-center pt-20 pb-10 sm:pt-28 md:pt-36 md:pb-16">
    <h1
      v-motion
      :initial="{
        opacity: 0,
        y: 16,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { ease: 'easeOut', duration: 450 },
      }"
      class="text-center text-5xl font-bold tracking-normal text-black sm:text-6xl md:text-7xl dark:text-white"
      :aria-label="title"
    >
      <span
        :key="title"
        class="chat-typing-title inline-block max-w-full overflow-hidden whitespace-nowrap border-r-[0.08em]"
        :style="typingStyle"
        aria-hidden="true"
      >
        {{ title }}
      </span>
    </h1>
  </section>
</template>
