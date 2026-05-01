<script setup lang="ts">
import type { LocationResponse } from '~~/types'

interface Props {
  location: LocationResponse
}

const props = defineProps<Props>()

// OpenStreetMap URL con la ubicación de la UCI
const mapUrl = computed(() => {
  const { latitude, longitude } = props.location.coordinates
  // Ajustar el bbox para un mejor zoom en la UCI
  const bbox = `${longitude - 0.005},${latitude - 0.005},${longitude + 0.005},${latitude + 0.005}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`
})

// URL para abrir en OpenStreetMap completo
const fullMapUrl = computed(() => {
  const { latitude, longitude } = props.location.coordinates
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15&layers=M`
})

// URL para Google Maps como alternativa
const googleMapsUrl = computed(() => {
  const { latitude, longitude } = props.location.coordinates
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=15`
})
</script>

<template>
  <div class="w-full">
    <!-- Mapa embebido -->
    <div class="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <iframe
        :src="mapUrl"
        class="w-full h-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación de la Universidad de las Ciencias Informáticas"
      />
      <!-- Overlay con información -->
      <div class="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        <div class="flex items-center gap-2">
          <UIcon name="i-ph-map-pin-duotone" class="text-blue-600 text-sm" />
          <span class="text-xs font-medium text-gray-700 dark:text-gray-300">
            {{ location.shortName }}
          </span>
        </div>
      </div>
    </div>

    <!-- Enlaces a mapas externos -->
    <div class="mt-3 flex flex-wrap gap-2">
      <a
        :href="fullMapUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg transition-colors"
      >
        <UIcon name="i-ph-map-duotone" class="text-sm" />
        Ver en OpenStreetMap
        <UIcon name="i-ph-arrow-square-out-duotone" class="text-xs" />
      </a>

      <a
        :href="googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-2 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-lg transition-colors"
      >
        <UIcon name="i-ph-google-logo-duotone" class="text-sm" />
        Ver en Google Maps
        <UIcon name="i-ph-arrow-square-out-duotone" class="text-xs" />
      </a>
    </div>

    <!-- Información de coordenadas -->
    <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-crosshair-duotone" class="text-xs" />
        <span>
          {{ location.coordinates.latitude.toFixed(4) }}°N,
          {{ Math.abs(location.coordinates.longitude).toFixed(4) }}°O
        </span>
      </div>
    </div>
  </div>
</template>
