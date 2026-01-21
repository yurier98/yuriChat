<script lang="ts" setup>
import type { UseTimeAgoMessages } from '@vueuse/core'
import type { Activity } from '~~/types'
import { activityMessages, IDEs } from '~~/types'

const { locale, t } = useI18n({ useScope: 'global' })
const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch<Activity>('/api/activity'))

useIntervalFn(async () => await refresh(), 5000)
const codingActivity = computed(() => {
  const activities = activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name)).map(activity => ({
    ...activity,
    name: activity.assets?.small_text === 'Cursor' ? 'Cursor' : activity.name,
  }))

  return activities.length > 1
    ? activities[Math.floor(Math.random() * activities.length)]
    : activities[0]
})

const isActive = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state } = codingActivity.value

  return name === 'Visual Studio Code' || name === 'Cursor'
    ? !details.includes('Idling')
    : state.toLowerCase().includes('editing')
})

const getActivity = computed(() => {
  if (!codingActivity.value)
    return

  const { name, details, state, timestamps } = codingActivity.value

  const project = details
    ? details
      .charAt(0)
      .toUpperCase()
      + details
        .slice(1)
        .replace('Workspace:', '')
        .trim()
    : ''

  const stateWord = state && state.split(' ').length >= 2 ? state.split(' ')[1] : t('tool.activity.secret')
  const ago = useTimeAgo(timestamps.start, {
    messages: activityMessages[locale.value as keyof typeof activityMessages] as UseTimeAgoMessages,
  }).value
  const formatDate = (date: number, format: string) => useDateFormat(date, format, { locales: locale.value ?? 'en' }).value

  return {
    name,
    project,
    state: stateWord,
    start: {
      ago,
      formated: {
        date: formatDate(timestamps.start, 'D MMMM'),
        time: formatDate(timestamps.start, 'HH:mm'),
      },
    },
  }
})
</script>

<template>
  <section>
    <div class="prose dark:prose-invert">
      <p>{{ t('tool.activity.response') }}</p>
    </div>
    <div v-if="getActivity" class="space-y-4">
      <div v-if="getActivity" class="prose dark:prose-invert flex items-center gap-2">
        <UTooltip :text="isActive ? t('tool.activity.tooltip.online') : t('tool.activity.tooltip.idling')">
          <div class="relative flex h-3 w-3 mx-1">
            <div
              v-if="isActive"
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
            />
            <div
              :class="isActive ? 'bg-green-500' : 'bg-amber-500'"
              class="relative inline-flex rounded-full h-3 w-3"
            />
          </div>
        </UTooltip>
        <div>
          {{ isActive ? t('tool.activity.working') : t('tool.activity.idling', {
            editor: getActivity.name,
          }) }}
        </div>
      </div>
      <ClientOnly>
        <UCard v-if="getActivity" variant="outline" class="md:max-w-1/2 m-1 shadow-sm bg-white dark:bg-neutral-900" :ui="{ body: 'flex gap-8 items-center' }">
          <UIcon
            :name="IDEs.find(ide => ide.name === getActivity!.name)!.icon"
            size="64"
          />
          <div class="">
            <div class="font-bold text-xl">
              {{ getActivity.name }}
            </div>
            <div v-if="isActive">
              {{ getActivity.state!.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }}
            </div>
            <div>{{ getActivity.project }}</div>
          </div>

          <template #footer>
            <div class="flex justify-end text-sm">
              <i18n-t keypath="tool.activity.started" tag="p">
                <template #ago>
                  {{ getActivity.start.ago }}
                </template>
                <template #date>
                  {{ getActivity.start.formated.date }}
                </template>
                <template #hour>
                  {{ getActivity.start.formated.time }}
                </template>
              </i18n-t>
            </div>
          </template>
        </UCard>
      </ClientOnly>
    </div>
    <div v-else class="flex md:items-start gap-2">
      <UTooltip :text="t('tool.activity.tooltip.offline')">
        <div class="relative flex h-3 w-3 mt-2">
          <div
            class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
          />
        </div>
      </UTooltip>
      <i18n-t
        keypath="tool.activity.offline"
        tag="p"
        class="not-prose"
      >
        <template #maths>
          <i>{{ t('tool.activity.maths') }}</i>
        </template>
      </i18n-t>
    </div>
  </section>
</template>
