<script lang="ts" setup>
const { data: skills } = await useAsyncData('skills', async () => await queryCollection('skills').first())

const { t, locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('tool.skills') }}</p>
    </div>
    <div v-if="skills" class="space-y-12 m-1 my-4">
      <div v-for="item in skills.body" :key="item.id" class="space-y-8">
        <USeparator
          :label="locale === 'en' ? item.name.en : locale === 'es' ? item.name.es : item.name.fr"
          size="xs"
          type="dashed"
        />
        <div class="flex gap-3 flex-wrap">
          <UButton
            v-for="skill in item.items"
            :key="skill.name.trim()"
            :label="skill.name"
            variant="subtle"
            color="neutral"
            class="shadow-sm bg-white dark:bg-neutral-900"
            :icon="skill.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>
