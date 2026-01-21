<script setup lang="ts">
import type { Weather } from '~~/types'

const { t } = useI18n({ useScope: 'global' })
const { data: weather, pending } = await useAsyncData<Weather>('weather', () =>
  $fetch('/api/weather'))
</script>

<template>
  <UIcon v-if="pending" name="i-ph-spinner-duotone" class="animate-spin" />
  <UCard v-if="weather" variant="outline" class="md:max-w-2/3 m-1 shadow-sm bg-white dark:bg-neutral-900">
    <template #header>
      <div class="flex gap-4 items-center">
        <UIcon name="i-ph-cloud-duotone" size="24" />
        <h3 class="text-lg font-semibold">
          {{ t('tool.weather.main') }}
        </h3>
      </div>
    </template>

    <template #default>
      <h3 class="text-2xl font-bold">
        {{ weather.location }}
      </h3>
      <div class="flex items-end gap-2">
        <span class="text-5xl font-bold">{{ weather.temperature }}°C</span>
        <span class="capitalize text-lg">{{ weather.description }}</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-4">
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
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between">
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
    title="Error al obtener el tiempo"
    description="Por favor, intente nuevamente"
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
