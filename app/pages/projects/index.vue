<script lang="ts" setup>
const { t } = useI18n({ useScope: 'global' })
useSeoMeta({
  title: 'My Projects',
  description: t('projects.description'),
})

const { data: projects } = await useAsyncData('all-projects', () => {
  return queryCollection('projects')
    .order('favorite', 'DESC')
    .order('publishedAt', 'DESC')
    .all()
})
</script>

<template>
  <UContainer class="space-y-12 mb-20 mt-8 md:mt-16 relative">
    <PostTitle
      :description="t('projects.description')"
      :title="t('projects.title')"
    />
    <PostAlert class="font-bold" />
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <NuxtLink
        v-for="(project, id) in projects"
        :key="id"
        :to="project.path"
      >
        <li
          class="flex flex-col h-full group hover:bg-neutral-200/50  duration-300 p-2 rounded-lg dark:hover:bg-neutral-800/50 transition-colors justify-center"
        >
          <article class="space-y-2">
            <div
              class="flex flex-col"
            >
              <div class="flex items-center gap-2">
                <h1 class="font-bold duration-300 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white">
                  {{ project.title }}
                </h1>
                <UIcon
                  v-if="project.favorite"
                  name="i-ph-star-duotone"
                  size="16"
                  class="text-amber-500 hover:rotate-360 duration-500"
                />
              </div>
              <h3 class="text-md text-neutral-500 dark:text-neutral-400 italic">
                {{ project.description }}
              </h3>
            </div>
          </article>
          <div class="flex flex-col sm:flex-row sm:items-center mt-1">
            <div
              class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
            >
              <ClientOnly>
                <p>{{ useDateFormat(project.publishedAt, 'DD MMM YYYY').value }} </p>
              </ClientOnly>
              <span class="w-2" />
              <div class="flex gap-2 flex-wrap">
                <ClientOnly>
                  <UBadge
                    v-for="tag in project.tags.sort((a: any, b: any) => a.localeCompare(b))"
                    :key="tag"
                    variant="soft"
                    size="sm"
                  >
                    {{ tag }}
                  </UBadge>
                </ClientOnly>
              </div>
            </div>
          </div>
        </li>
      </NuxtLink>
    </ul>
  </UContainer>
</template>
