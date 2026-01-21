<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <UApp class="relative flex h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-center font-serif text-[14rem] italic">
        404
      </h1>
      <p class="text-center flex gap-0.5">
        {{ t('error.main') }}
      </p>
      <NuxtLink href="/" class="sofia flex items-center group">
        <span class="duration-300 underline-offset-2 font-semibold text-md text-black dark:text-white underline decoration-gray-300 dark:decoration-neutral-700 group-hover:decoration-black dark:group-hover:decoration-white">
          {{ t('error.redirect') }}
        </span>
      </NuxtLink>
    </div>
  </UApp>
</template>
