<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="flex flex-col my-8 md:my-32">
    <h1
      v-motion
      :initial="{
        opacity: 0,
        y: 100,
        scale: 0.6,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { ease: 'linear' },
      }"
      class="font-bold text-5xl duration-200"
    >
      {{ t('chat.welcome') }}
    </h1>
    <h2
      v-motion
      :initial="{
        opacity: 0,
        y: 200,
        scale: 0.6,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: 300,
          ease: 'linear',
        },
      }"
      class="text-3xl bg-gradient-to-r from-inverted/40 to-inverted/75 to-50% bg-clip-text text-transparent font-medium duration-200"
    >
      {{ t('chat.ask') }}
    </h2>
  </div>
</template>
