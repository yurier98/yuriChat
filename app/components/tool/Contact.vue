<script lang="ts" setup>
import { socials } from '~~/types'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section>
    <p class="prose dark:prose-invert">
      {{ t('tool.contact') }}
    </p>
    <div class="flex gap-2 flex-wrap my-2">
      <UButton
        v-for="social in socials"
        :key="social.label"
        :icon="social.icon"
        :label="social.label"
        variant="subtle"
        color="neutral"
        target="_blank"
        size="xl"
        class="m-1 shadow-sm bg-white dark:bg-neutral-900"
        :href="social.to"
        :aria-label="social.label"
      />
    </div>
  </section>
</template>
