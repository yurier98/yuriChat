<script lang="ts" setup>
const { t } = useI18n({ useScope: 'global' })
const { dark, toggleDark } = useTheme()
</script>

<template>
  <section class="space-y-4">
    <div class="prose dark:prose-invert">
      <p>{{ t('tool.theme.response.control') }}</p>
      <ul>
        <li>{{ t('tool.theme.response.choose') }}</li>
        <i18n-t keypath="tool.theme.response.kbd" tag="li">
          <template #kbd>
            <UKbd>T</UKbd>
          </template>
        </i18n-t>
      </ul>
    </div>
    <ClientOnly>
      <UCard variant="outline" class="md:max-w-1/2 m-1 shadow-sm bg-white dark:bg-neutral-900" :ui="{ body: 'flex justify-between items-center' }">
        <div class="flex items-center gap-2">
          <UIcon v-if="dark" name="i-ph-moon-duotone" size="24" />
          <UIcon v-else name="i-ph-sun-duotone" size="24" />
          <span>{{ t('tool.theme.switch') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">{{ t('tool.theme.light') }}</span>
          <USwitch
            v-model="dark"
            color="neutral"
            size="lg"
            aria-label="switch theme"
            @click.prevent="toggleDark"
          />
          <span class="text-xs text-muted">{{ t('tool.theme.dark') }}</span>
        </div>
      </UCard>
    </ClientOnly>
  </section>
</template>

<style scoped>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
