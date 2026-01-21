<script lang="ts" setup>
import type { Stats } from '~~/types'

const { data: stats } = await useAsyncData<Stats>('stats', () => $fetch('/api/stats'))

const { locale, t } = useI18n({ useScope: 'global' })

const time = useTimeAgo(new Date(stats.value!.coding.data.range.start) ?? new Date()).value.split(' ')[0]
const date = useDateFormat(new Date(stats.value!.coding.data.range.start ?? new Date()), 'DD MMMM YYYY', { locales: locale.value ?? 'en' })
const hours = usePrecision(stats.value!.coding.data.grand_total.total_seconds_including_other_language / 3600, 0)
</script>

<template>
  <section v-if="stats && stats.coding && stats.editors && stats.os && stats.languages && time && date && hours">
    <div class="prose dark:prose-invert">
      <i18n-t
        keypath="tool.stats.main"
        tag="p"
      >
        <template #time>
          {{ time }}
        </template>
        <template #date>
          <HoverText
            :hover="t('tool.stats.tooltip.date')"
            :text="date"
          />
        </template>
        <template #hours>
          <HoverText
            :hover="t('tool.stats.tooltip.hours')"
            :text="hours"
          />
        </template>
      </i18n-t>
      <ul>
        <i18n-t
          keypath="tool.stats.editors"
          tag="li"
        >
          <template #editors>
            {{ stats.editors.data.slice(0, 2).map(editor => `${editor.name} (${editor.percent}%)`).join(t('tool.stats.separator')) }}
          </template>
        </i18n-t>
        <i18n-t
          keypath="tool.stats.os"
          tag="li"
        >
          <template
            v-if="stats.os.data[0]"
            #os
          >
            {{ stats.os.data[0].name }} ({{ stats.os.data[0].percent }}%)
          </template>
        </i18n-t>
        <i18n-t
          keypath="tool.stats.languages"
          tag="li"
        >
          <template #languages>
            {{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(t('tool.stats.separator')) }}
          </template>
        </i18n-t>
      </ul>
    </div>
  </section>
</template>
