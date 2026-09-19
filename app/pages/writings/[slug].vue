<script lang="ts" setup>
import { useDateFormat } from '#imports'

const route = useRoute()
const { data: writing } = await useAsyncData(`writings/${route.params.slug}`, () =>
  queryCollection('writings').path(`/writings/${route.params.slug}`).first())

if (!writing.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Writing "${route.params.slug}" not found`,
  })
}

const { t, locale } = useI18n({ useScope: 'global' })

// The title MUST be set explicitly: without it the head falls back to a
// slug-derived title ("Rag Ai Agents"), not the article's real title.
// No " — Yurier Herrera" suffix here on purpose: article titles are long and
// Google truncates near 60 characters, so the name would land past the cut and
// buy nothing. The name still reaches search via the schema.org identity,
// og:site_name and the site title. (Project pages DO get the suffix — their
// titles are short.)
useSeoMeta({
  title: () => writing.value?.title,
  description: () => writing.value?.description,
})
</script>

<template>
  <UContainer v-if="writing" class="mt-16 mb-22">
    <NuxtLink
      to="/writings"
      class="mb-4 text-sm text-neutral-500 duration-300 flex items-center gap-1 hover:text-black dark:hover:text-white"
    >
      <UIcon name="ph:arrow-left-duotone" size="16" />
      <span>{{ t('writings.back') }}</span>
    </NuxtLink>
    <div>
      <div class="flex items-end justify-between gap-2 flex-wrap">
        <h1
          class="font-bold text-3xl text-black dark:text-white"
        >
          {{ writing.title }}
        </h1>
        <div
          class="text-sm text-neutral-500 duration-300 flex items-center gap-2"
        >
          <UIcon name="ph:calendar-duotone" size="16" />
          <p>{{ useDateFormat(writing.publishedAt, 'DD MMMM YYYY', { locales: locale }).value }} </p>
          <PostShare :title="writing.title" />
        </div>
      </div>
      <p class="mt-2 text-base">
        {{ writing.description }}
      </p>
    </div>
    <div
      v-if="writing.cover"
      class="w-full rounded-md my-8"
    >
      <ProseImg
        :src="`/writings/${writing.cover}`"
        label="Project cover"
      />
    </div>
    <PostAlert class="my-8 font-bold" :content-locale="writing.locale" />
    <USeparator
      class="my-4"
      icon="i-ph-pencil-line-duotone"
    />
    <ClientOnly>
      <ContentRenderer
        :value="writing"
        class="!max-w-none prose dark:prose-invert"
      />
    </ClientOnly>
    <PostShare :title="writing.title" class="mt-8" />
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
