<script setup lang="ts">
const { t, locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <h3
    v-if="locale !== 'en'"
  >
    ⚠️ {{ t('alert') }}
  </h3>
</template>
