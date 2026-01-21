<script lang="ts" setup>
const { locale, t } = useI18n({ useScope: 'global' })

const { data: writings } = await useAsyncData('writings-index', async () => await queryCollection('writings').order('publishedAt', 'DESC').select('title', 'description', 'id', 'publishedAt', 'tags', 'slug').limit(2).all())
const formatDate = (date: string) => useDateFormat(new Date(date), 'DD MMMM YYYY', { locales: locale.value ?? 'en' })
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <PostAlert class="mb-2" />
      <i18n-t keypath="tool.writings.main" tag="p">
        <template #writings>
          <UButton
            :label="t('tool.writings.link')"
            color="neutral"
            variant="link"
            size="lg"
            trailing-icon="i-ph-books-duotone"
            to="/writings"
            class="cursor-pointer px-0 py-0.5"
          />
        </template>
        <template #space>
          <br>
        </template>
      </i18n-t>
    </div>
    <div v-if="writings" class="m-1 my-4 flex flex-col gap-4">
      <div v-for="writing in writings" :key="writing.id">
        <NuxtLink :to="`/writings/${writing.slug}`">
          <UCard variant="subtle" class="shadow-sm bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-black duration-300">
            <h1 class="text-xl font-medium">
              {{ writing.title }}
            </h1>
            <h3 class="text-muted my-2">
              {{ writing.description }}
            </h3>
            <div class="flex items-center justify-between">
              <p class="text-sm text-muted-foreground">
                {{ formatDate(writing.publishedAt).value }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in writing.tags.sort((a: any, b: any) => a.localeCompare(b))"
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
