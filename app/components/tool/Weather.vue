<script setup lang="ts">
import type { Weather } from '~~/types'

const { t } = useI18n({ useScope: 'global' })
const { data: weather, pending } = await useAsyncData<Weather>('weather', () =>
  $fetch('/api/weather'))
</script>

<template>
  <UIcon v-if="pending" name="i-ph-spinner-duotone" class="animate-spin" />
  <UCard v-if="weather" variant="outline" class="m-1 shadow-sm bg-white dark:bg-neutral-900">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-ph-cloud-duotone" size="24" />
        <h3 class="text-lg font-semibold">
          {{ t('tool.weather.main') }}
        </h3>
      </div>
    </template>

    <template #default>
      <h3 class="text-xl font-bold sm:text-2xl">
        {{ weather.location }}
      </h3>
      <div class="flex flex-wrap items-end gap-x-2 gap-y-0.5">
        <span class="text-4xl font-bold sm:text-5xl">{{ weather.temperature }}°C</span>
        <span class="capitalize text-lg">{{ t(`tool.weather.condition.${weather.condition}`) }}</span>
      </div>

      <div class="grid grid-cols-2 gap-2 mt-4 sm:grid-cols-4">
        <div class="bg-zinc-200 dark:bg-zinc-800 rounded-md p-2 text-center">
          <p class="text-sm text-zinc-800 dark:text-zinc-400">
            {{ t('tool.weather.high') }}
          </p>
          <p class="font-semibold">
            {{ weather.temp_max }}°C
          </p>
        </div>
        <div class="bg-zinc-200 dark:bg-zinc-800 rounded-md p-2 text-center">
          <p class="text-sm text-zinc-800 dark:text-zinc-400">
            {{ t('tool.weather.low') }}
          </p>
          <p class="font-semibold">
            {{ weather.temp_min }}°C
          </p>
        </div>
        <div class="bg-zinc-200 dark:bg-zinc-800 rounded-md p-2 text-center">
          <p class="text-sm text-zinc-800 dark:text-zinc-400">
            {{ t('tool.weather.humidity') }}
          </p>
          <p class="font-semibold">
            {{ weather.humidity }}%
          </p>
        </div>
        <div class="bg-zinc-200 dark:bg-zinc-800 rounded-md p-2 text-center">
          <p class="text-sm text-zinc-800 dark:text-zinc-400">
            {{ t('tool.weather.feels_like') }}
          </p>
          <p class="font-semibold">
            {{ weather.feelsLike }}°C
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          {{ t('tool.weather.wind') }}: {{ weather.wind }} km/h
        </p>
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          {{ t('tool.weather.powered_by') }}
        </p>
      </div>
    </template>
  </UCard>
  <UAlert
    v-else
    color="primary"
    variant="subtle"
    :title="t('tool.weather.error.title')"
    :description="t('tool.weather.error.description')"
    icon="i-ph-warning-duotone"
  />
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
