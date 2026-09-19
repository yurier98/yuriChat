<script lang="ts" setup>
interface Localized { en: string, es: string }

const { data: skills } = await useAsyncData('skills', async () => await queryCollection('skills').first())

const { t, locale } = useI18n({ useScope: 'global' })

function resolve(value: string | Localized) {
  if (typeof value === 'string')
    return value
  if (locale.value === 'es')
    return value.es
  return value.en
}
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('tool.skills') }}</p>
    </div>
    <div v-if="skills" class="space-y-12 m-1 my-4">
      <div v-for="group in skills.body" :key="group.id" class="space-y-8">
        <USeparator
          :label="resolve(group.name)"
          size="xs"
          type="dashed"
        />
        <div class="flex gap-3 flex-wrap">
          <UButton
            v-for="skill in group.items"
            :key="resolve(skill.name).trim()"
            :label="resolve(skill.name)"
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
