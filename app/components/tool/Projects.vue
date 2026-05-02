<script lang="ts" setup>
const { locale, t } = useI18n({ useScope: 'global' })

const { data: projects } = await useAsyncData('projects-index', async () => await queryCollection('projects').where('favorite', '=', true).select('title', 'description', 'id', 'publishedAt', 'tags', 'slug', 'locale').all())
const date = (date: string) => useDateFormat(new Date(date), 'DD MMMM YYYY', { locales: locale.value ?? 'en' })

const activeLanguage = computed(() => locale.value === 'es' ? 'es' : 'en')
const localizedProjects = computed(() => {
  const bySlug = new Map<string, any[]>()

  for (const project of projects.value || []) {
    const entries = bySlug.get(project.slug) || []
    entries.push(project)
    bySlug.set(project.slug, entries)
  }

  return Array.from(bySlug.values()).map((entries) => {
    return entries.find(project => project.locale === activeLanguage.value)
      || entries.find(project => !project.locale)
      || entries[0]
  })
})

function projectRoute(project: any) {
  return project.locale ? `/projects/${project.slug}` : project.path
}
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <PostAlert class="mb-2" />
      <i18n-t keypath="tool.projects.main" tag="p">
        <template #projects>
          <UButton
            :label="t('tool.projects.link')"
            color="neutral"
            variant="link"
            size="lg"
            trailing-icon="i-ph-code-duotone"
            to="/projects"
            class="cursor-pointer px-0 py-0.5"
          />
        </template>
        <template #space>
          <br>
        </template>
      </i18n-t>
    </div>
    <div v-if="localizedProjects.length" class="m-1 my-4 flex flex-col gap-4">
      <div v-for="project in localizedProjects" :key="project.id">
        <NuxtLink :to="projectRoute(project)">
          <UCard variant="subtle" class="shadow-sm bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-black duration-300">
            <h1 class="text-xl font-medium">
              {{ project.title }}
            </h1>
            <h3 class="text-muted my-2">
              {{ project.description }}
            </h3>
            <div class="flex items-center justify-between">
              <p class="text-sm text-muted-foreground">
                {{ date(project.publishedAt).value }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in project.tags.sort((a: any, b: any) => a.localeCompare(b))"
                  :key="tag"
                  variant="soft"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
