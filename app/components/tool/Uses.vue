<script lang="ts" setup>
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

const { locale } = useI18n({ useScope: 'global' })

const { data: items } = await useAsyncData(`uses-${props.category}`, async () => await queryCollection('uses').where('category', '=', props.category).all())
const { data: categoryData } = await useAsyncData(`category-${props.category}`, async () => await queryCollection('usesCategories').where('slug', '=', props.category).first())
</script>

<template>
  <section>
    <div v-if="items && categoryData" class="space-y-4">
      <USeparator
        :label="locale === 'en' ? categoryData.name.en : locale === 'es' ? categoryData.name.es : categoryData.name.fr"
        size="xs"
      />
      <ul class="space-y-8">
        <li v-for="item in items" :key="item.id">
          <p class="text-base font-semibold">
            {{ item.name }}
          </p>
          <p class="text-sm">
            {{ locale === 'en' ? item.description.en : locale === 'es' ? item.description.es : item.description.fr }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
