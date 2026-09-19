<script lang="ts" setup>
const { data: experiences } = await useAsyncData('experiences', async () => await queryCollection('experiences').all())

const { t, locale } = useI18n({ useScope: 'global' })

const sortedExperiences = computed(() => [...(experiences.value ?? [])].sort((a, b) => {
  if (!a.endDate && !b.endDate) {
    return 0
  }
  if (!a.endDate) {
    return -1
  }
  if (!b.endDate) {
    return 1
  }
  return new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
}))

function getLanguageForText(text: { en: string, es: string }) {
  return locale.value === 'en' ? text.en : text.es
}

function formatDate(date: string) {
  const [yearStr, monthStr, dayStr] = date.split('-')
  const year = Number(yearStr)
  const month = monthStr ? Number(monthStr) : undefined
  const day = dayStr ? Number(dayStr) : undefined

  if (!year || Number.isNaN(year)) {
    return null
  }

  if (!month) {
    return String(year)
  }

  const format = day === undefined ? 'MMM YYYY' : 'D MMM YYYY'
  return useDateFormat(new Date(year, month - 1, day ?? 1), format, { locales: locale.value ?? 'en' }).value
}

function formatDateRange(entry: { startDate?: string, endDate?: string }) {
  const start = entry.startDate ? formatDate(entry.startDate) : null
  const end = entry.endDate ? formatDate(entry.endDate) : null

  if (start && end) {
    return `${start} – ${end}`
  }
  return end ?? start
}
</script>

<template>
  <section>
    <div class="prose dark:prose-invert mb-6">
      <p>{{ t('tool.experiences.main') }}</p>
    </div>
    <!-- Nested radius rule: card radius (1rem) = message container radius (1.75rem) - container padding (p-3 = 0.75rem).
         No extra margin on the card, so the container padding is the only inset and the corners stay concentric. -->
    <div v-if="sortedExperiences.length" class="space-y-3">
      <div
        v-for="entry in sortedExperiences"
        :key="entry.id"
        class="rounded-[1rem] border border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
      >
        <div class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 shrink-0 bg-blue-600 rounded-full flex items-center justify-center">
              <UIcon name="i-ph-briefcase-duotone" class="text-white text-lg" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white">
                {{ getLanguageForText(entry.title) }}
              </h3>
              <NuxtLink
                v-if="entry.companyUrl"
                :to="entry.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-blue-600 hover:text-blue-600/80"
              >
                {{ entry.company }}
              </NuxtLink>
              <p v-else class="text-sm text-gray-600 dark:text-gray-300">
                {{ entry.company }}
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <!-- Dates on the left, location pushed to the right on the same line.
                 `ml-auto` keeps the location right-aligned even when there is no date. -->
            <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <div v-if="formatDateRange(entry)" class="flex items-start gap-2">
                <UIcon name="i-ph-calendar-duotone" class="text-green-600 mt-0.5" />
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ formatDateRange(entry) }}
                </p>
              </div>

              <div v-if="entry.location" class="ml-auto flex items-start gap-2">
                <UIcon name="i-ph-map-pin-duotone" class="text-blue-600 mt-0.5" />
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ entry.location }}
                </p>
              </div>
            </div>

            <ul v-if="entry.highlights && entry.highlights.length" class="space-y-1.5">
              <li v-for="(highlight, index) in entry.highlights" :key="index" class="flex gap-2">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span class="text-sm text-gray-600 dark:text-gray-300">{{ getLanguageForText(highlight) }}</span>
              </li>
            </ul>

            <div v-if="entry.tags && entry.tags.length" class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in entry.tags"
                :key="tag"
                variant="soft"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
