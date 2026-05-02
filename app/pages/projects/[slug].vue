<script lang="ts" setup>
import { useDateFormat } from '#imports'

const route = useRoute()
const { t, locale } = useI18n({ useScope: 'global' })
const { data: projectVersions } = await useAsyncData(`projects/${route.params.slug}`, async () => {
  const projects = await queryCollection('projects').all()
  const routePath = `/projects/${String(route.params.slug)}`

  return projects.filter(project => project.slug === String(route.params.slug) || project.path === routePath)
})

const activeLanguage = computed(() => locale.value === 'es' ? 'es' : 'en')
const project = computed(() => {
  return projectVersions.value?.find(project => project.locale === activeLanguage.value)
    || projectVersions.value?.find(project => !project.locale)
    || projectVersions.value?.[0]
})

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Project "${route.params.slug}" not found`,
  })
}

useSeoMeta(() => project.value?.seo || {})

useSeoMeta({
  title: () => project.value?.title,
  description: () => project.value?.description,
  author: 'Yurier Herrera',
})
</script>

<template>
  <UContainer v-if="project" class="mt-16 mb-22">
    <NuxtLink
      to="/projects"
      class="mb-4 text-sm text-neutral-500 duration-300 flex items-center gap-1 hover:text-black dark:hover:text-white"
    >
      <UIcon name="ph:arrow-left-duotone" size="16" />
      <span>{{ t('projects.back') }}</span>
    </NuxtLink>
    <div>
      <div class="flex items-end justify-between gap-2 flex-wrap">
        <h1
          class="font-bold text-3xl text-black dark:text-white"
        >
          {{ project.title }}
        </h1>
        <div
          class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
        >
          <UIcon name="ph:calendar-duotone" size="16" />
          <p>{{ useDateFormat(project.publishedAt, 'DD MMMM YYYY').value }} </p>
        </div>
      </div>
      <p class="mt-2 text-base">
        {{ project.description }}
      </p>
    </div>
    <div
      v-if="project.cover"
      class="w-full rounded-md my-8"
    >
      <ProseImg
        :src="`/projects/${project.cover}`"
        label="Project cover"
        class="w-full rounded-md my-8"
      />
    </div>
    <PostAlert class="mb-8 font-bold" />
    <USeparator
      class="my-4"
      icon="i-ph-pencil-line-duotone"
    />
    <ClientOnly>
      <ContentRenderer
        :value="project"
        class="!max-w-none prose dark:prose-invert"
      />
    </ClientOnly>
    <PostFooter />
  </UContainer>
</template>

<style scoped>
.prose h2 a,
.prose h3 a,
.prose h4 a {
  text-decoration: none;
}

.prose img {
  margin: 0;
}

.katex-html {
  display: none;
}

html {
  scroll-behavior: smooth;
}
</style>
