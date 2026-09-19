<script setup lang="ts">
const props = defineProps<{
  contentLocale: 'en' | 'es'
}>()

const { t, locale } = useI18n({ useScope: 'global' })

const isForeign = computed(() => props.contentLocale !== (locale.value === 'es' ? 'es' : 'en'))
</script>

<template>
  <h3 v-if="isForeign">
    ⚠️ {{ t('alert') }}
  </h3>
</template>
