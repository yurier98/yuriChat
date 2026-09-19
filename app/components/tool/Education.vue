<script lang="ts" setup>
const { data: education } = await useAsyncData('education', async () => await queryCollection('education').all())

const { t, locale } = useI18n({ useScope: 'global' })

const kindIcons: Record<'degree' | 'certification' | 'course', string> = {
  degree: 'i-ph-graduation-cap-duotone',
  certification: 'i-ph-certificate-duotone',
  course: 'i-ph-book-open-duotone',
}

const sortedEducation = computed(() => [...(education.value ?? [])].sort((a, b) => {
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
      <p>{{ t('tool.education.main') }}</p>
    </div>
    <!-- Nested radius rule: card radius (1rem) = message container radius (1.75rem) - container padding (p-3 = 0.75rem).
         No extra margin on the card, so the container padding is the only inset and the corners stay concentric. -->
    <div v-if="sortedEducation.length" class="space-y-3">
      <div
        v-for="entry in sortedEducation"
        :key="entry.id"
        class="rounded-[1rem] border border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
      >
        <div class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 shrink-0 bg-primary rounded-full flex items-center justify-center">
              <UIcon :name="kindIcons[entry.kind]" class="text-white text-lg" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h3 class="min-w-0 text-base font-semibold text-gray-900 dark:text-white">
                  {{ getLanguageForText(entry.title) }}
                </h3>
                <UBadge color="primary" variant="subtle" class="shrink-0">
                  {{ t(`tool.education.${entry.kind}`) }}
                </UBadge>
              </div>
              <NuxtLink
                v-if="entry.institutionUrl"
                :to="entry.institutionUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-primary hover:text-primary/80"
              >
                {{ entry.institution }}
              </NuxtLink>
              <p v-else-if="entry.institution" class="text-sm text-gray-600 dark:text-gray-300">
                {{ entry.institution }}
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <div v-if="entry.location" class="flex items-start gap-2">
              <UIcon name="i-ph-map-pin-duotone" class="text-primary mt-0.5" />
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ entry.location }}
              </p>
            </div>

            <div v-if="formatDateRange(entry)" class="flex items-start gap-2">
              <UIcon name="i-ph-calendar-duotone" class="text-green-600 mt-0.5" />
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ formatDateRange(entry) }}
              </p>
            </div>

            <p v-if="entry.description" class="text-sm text-justify text-gray-600 dark:text-gray-300">
              {{ getLanguageForText(entry.description) }}
            </p>

            <div v-if="entry.tags && entry.tags.length" class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in entry.tags"
                :key="tag"
                variant="soft"
              >
                {{ tag }}
              </UBadge>
            </div>

            <div v-if="entry.credentialUrl" class="pt-1.5 border-t border-gray-200 dark:border-gray-700">
              <NuxtLink
                :to="entry.credentialUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <UIcon name="i-ph-arrow-square-out-duotone" />
                {{ t('tool.education.credential') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
