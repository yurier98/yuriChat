<script lang="ts" setup>
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section class="prose dark:prose-invert">
    <h3>{{ t('tool.duplicated.title') }}</h3>
    <p>{{ t('tool.duplicated.description') }}</p>
  </section>
</template>
