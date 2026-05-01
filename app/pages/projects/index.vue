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
        class="group block h-full rounded-[1.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25"
      >
        <li
          class="relative flex h-full flex-col justify-center overflow-hidden rounded-[1.5rem] border border-transparent p-4 transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-white/55 group-hover:bg-white/40 group-hover:shadow-[0_18px_55px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.74),inset_0_-1px_0_rgba(15,23,42,0.06)] group-hover:backdrop-blur-2xl group-focus-visible:border-white/55 group-focus-visible:bg-white/40 group-focus-visible:shadow-[0_18px_55px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.74),inset_0_-1px_0_rgba(15,23,42,0.06)] dark:group-hover:border-neutral-700/70 dark:group-hover:bg-white/[0.075] dark:group-hover:shadow-[0_18px_55px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.11),inset_0_-1px_0_rgba(0,0,0,0.24)] dark:group-focus-visible:border-neutral-700/70 dark:group-focus-visible:bg-white/[0.075] dark:group-focus-visible:shadow-[0_18px_55px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.11),inset_0_-1px_0_rgba(0,0,0,0.24)]"
        >
          <article class="space-y-2">
            <div
              class="flex flex-col"
            >
              <div class="flex items-center gap-2">
                <h1 class="font-bold duration-300 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white">
                  {{ project.title }}
                </h1>
                <UIcon
                  v-if="project.favorite"
                  name="i-ph-star-duotone"
                  size="16"
                  class="text-amber-500 hover:rotate-360 duration-500"
                />
              </div>
              <h3 class="text-md text-neutral-500 dark:text-neutral-400 italic duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                {{ project.description }}
              </h3>
            </div>
          </article>
          <div class="flex flex-col sm:flex-row sm:items-center mt-1">
            <div
              class="text-sm text-neutral-500 duration-300 flex items-center gap-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
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
                    class="transition-[background-color,box-shadow] duration-300 group-hover:!bg-white/48 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] dark:group-hover:!bg-white/[0.12] dark:group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
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
