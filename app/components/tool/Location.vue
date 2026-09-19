<script setup lang="ts">
import type { LocationResponse } from '~~/types'

const location = ref<LocationResponse | null>(null)
const pending = ref(true)

// Fallback data in case API fails
const fallbackLocation: LocationResponse = {
  name: 'Universidad de las Ciencias Informáticas',
  shortName: 'UCI',
  address: 'Av. Sete de Setembro, Centro, Curitiba - PR, Brasil',
  coordinates: {
    latitude: -25.4284,
    longitude: -49.2733,
  },
  city: 'Curitiba',
  country: 'Brasil',
  countryCode: 'BR',
  flag: '🇧🇷',
  description: 'Universidad especializada en Ciencias de la Computación e Informática',
  website: 'https://www.uci.cu',
  founded: 2002,
  type: 'Universidad Pública',
  specialties: [
    'Ciencias de la Computación',
    'Ingeniería Informática',
    'Ciberseguridad',
    'Inteligencia Artificial',
    'Desarrollo de Software',
  ],
  timezone: 'America/Sao_Paulo',
  currentTime: new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
}

const locationData = computed(() => location.value ?? fallbackLocation)

try {
  location.value = await $fetch<LocationResponse>('/api/location')
}
catch {
  location.value = null
}
finally {
  pending.value = false
}
</script>

<template>
  <section>
    <div class="prose dark:prose-invert mb-4">
      <i18n-t keypath="tool.location" tag="p">
        <template #location>
          <strong>{{ locationData.city }}, {{ locationData.country }} {{ locationData.flag }}</strong>
        </template>
      </i18n-t>
    </div>

    <!-- Mapa de la UCI -->
    <div v-if="!pending" class="mt-4">
      <div class="prose dark:prose-invert mb-3">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon name="i-ph-map-duotone" class="text-primary" />
          Ubicación en el mapa
        </h4>
      </div>
      <ToolMapViewer :location="locationData" />
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="m-1 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
          <div class="flex-1">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2" />
            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4" />
          </div>
        </div>
        <div class="space-y-3">
          <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-2/3" />
          <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/2" />
        </div>
      </div>
    </div>
  </section>
</template>
