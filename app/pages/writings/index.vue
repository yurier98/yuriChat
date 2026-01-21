<script lang="ts" setup>
const { t } = useI18n({ useScope: 'global' })
useSeoMeta({
  title: 'My Shelf - Yurier Herrera',
  description: t('writings.description'),
})

const { data: writings } = await useAsyncData('all-writings', () => {
  return queryCollection('writings')
    .order('publishedAt', 'DESC')
    .all()
})

const groupedWritings = computed(() => {
  const grouped: Record<string, any[]> = {}
  writings.value!.forEach((writing: any) => {
    const year = new Date(writing.publishedAt).getFullYear().toString()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(writing)
  })
  return Object.entries(grouped).reverse()
})
</script>

<template>
  <UContainer class="space-y-12 mb-20 mt-8 md:mt-16 relative">
    <PostTitle
      :description="t('writings.description')"
      :title="t('writings.title')"
    />
    <PostAlert class="font-bold" />
    <div class="space-y-8">
      <div v-for="year in groupedWritings" :key="year[0]" class="lg:space-y-6 relative">
        <h2 class="text-4xl lg:absolute top-2 -left-16 font-bold opacity-10 select-none pointer-events-none lg:[writing-mode:vertical-rl] lg:[text-orientation:upright] pl-1 lg:pl-0">
          {{ year[0] }}
        </h2>
        <ul class="relative grid grid-cols-1 gap-2">
          <NuxtLink
            v-for="(writing, id) in year[1]"
            :key="id"
            :to="writing.path"
          >
            <li
              class="h-full group hover:bg-neutral-200/50 duration-300 p-1 lg:p-2 rounded-lg dark:hover:bg-neutral-800/50 transition-colors"
            >
              <h1
                class="font-bold text-lg duration-300 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
              >
                {{ writing.title }}
              </h1>
              <h3 class="text-neutral-600 dark:text-neutral-400 italic">
                {{ writing.description }}
              </h3>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-1">
                <div
                  class="text-sm text-neutral-500 duration-300 flex items-center gap-1"
                >
                  <ClientOnly>
                    <p>{{ useDateFormat(writing.publishedAt, 'DD MMM').value }} </p>
                  </ClientOnly>
                  <span>·</span>
                  <p>{{ writing.readingTime }}min</p>
                  <span class="w-2" />
                  <div class="flex gap-2 flex-wrap">
                    <ClientOnly>
                      <UBadge
                        v-for="tag in writing.tags.sort((a: any, b: any) => a.localeCompare(b))"
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
      </div>
    </div>
  </UContainer>
</template>
