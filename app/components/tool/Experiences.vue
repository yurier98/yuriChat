<script lang="ts" setup>
const { data: experiences } = await useAsyncData('experiences', async () => await queryCollection('experiences').all())

const { t, locale } = useI18n({ useScope: 'global' })
const formatDate = (date: string) => useDateFormat(new Date(date), 'MMM YYYY', { locales: locale.value ?? 'en' }).value
function getLanguageForText(text: { en: string, es: string, fr: string }) {
  return locale.value === 'en' ? text.en : locale.value === 'es' ? text.es : text.fr
}
</script>

<template>
  <section>
    <div class="prose dark:prose-invert mb-16">
      <p>{{ t('tool.experiences.main') }}</p>
    </div>
    <div v-if="experiences" class="space-y-16 m-1 my-4">
      <div
        v-for="experience in experiences.sort((a, b) => new Date(b.endDate ?? '').getTime() - new Date(a.endDate ?? '').getTime())"
        :key="experience.id"
        class="flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <UBadge variant="solid" size="lg" color="neutral">
            {{ formatDate(experience.startDate) }} - {{ experience.endDate ? formatDate(experience.endDate) : t('tool.experiences.today') }}
          </UBadge>
          <div class="flex items-center gap-2">
            <h1 class="text-xl">
              {{ getLanguageForText(experience.title) }}
            </h1>
            <NuxtLink
              :to="experience.companyUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 class="text-xl text-neutral-800 dark:text-neutral-200 font-semibold">
                <span class="text-muted">@</span>{{ experience.company }}
              </h2>
            </NuxtLink>
          </div>
        </div>
        <p class="text-justify">
          {{ getLanguageForText(experience.description) }}
        </p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in experience.tags.sort((a: any, b: any) => a.localeCompare(b))"
            :key="tag"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>
    </div>
  </section>
</template>
