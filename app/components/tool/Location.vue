<script setup lang="ts">
import type { LocationResponse } from '~~/types'

const location = ref<LocationResponse | null>(null)
const pending = ref(true)

// Fallback data in case API fails
const fallbackLocation: LocationResponse = {
  name: 'Universidad de las Ciencias Informáticas',
  shortName: 'UCI',
  address: 'Carretera a San Antonio de los Baños, Km 2½, La Habana, Cuba',
  coordinates: {
    latitude: 22.986160,
    longitude: -82.465181,
  },
  city: 'La Habana',
  country: 'Cuba',
  countryCode: 'CU',
  flag: '🇨🇺',
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
  timezone: 'America/Havana',
  currentTime: new Date().toLocaleString('es-CU', {
    timeZone: 'America/Havana',
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
          <UIcon name="i-ph-map-duotone" class="text-blue-600" />
          Ubicación en el mapa
        </h4>
      </div>
      <ToolMapViewer :location="locationData" />
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="m-1 md:max-w-2/3 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
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

    <!-- UCI Information Card -->
    <div v-else class="m-1 md:max-w-2/3 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div class="p-6">
        <!-- University Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <UIcon name="i-ph-graduation-cap-duotone" class="text-white text-xl" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ locationData.shortName }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ locationData.name }}
            </p>
          </div>
        </div>

        <!-- University Details -->
        <div class="space-y-3">
          <div class="flex items-start gap-2">
            <UIcon name="i-ph-map-pin-duotone" class="text-blue-600 mt-1" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Dirección
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ locationData.address }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <UIcon name="i-ph-calendar-duotone" class="text-green-600 mt-1" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Fundada
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ locationData.founded }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <UIcon name="i-ph-clock-duotone" class="text-purple-600 mt-1" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Hora Local
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ locationData.currentTime }}
              </p>
            </div>
          </div>

          <!-- Specialties -->
          <div class="flex items-start gap-2">
            <UIcon name="i-ph-student-duotone" class="text-orange-600 mt-1" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Especialidades
              </p>
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  v-for="specialty in locationData.specialties.slice(0, 3)"
                  :key="specialty"
                  class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {{ specialty }}
                </span>
                <span
                  v-if="locationData.specialties.length > 3"
                  class="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  +{{ locationData.specialties.length - 3 }} más
                </span>
              </div>
            </div>
          </div>

          <!-- Website Link -->
          <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
            <a
              :href="locationData.website"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <UIcon name="i-ph-globe-duotone" />
              Visitar sitio web
              <UIcon name="i-ph-arrow-square-out-duotone" class="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
