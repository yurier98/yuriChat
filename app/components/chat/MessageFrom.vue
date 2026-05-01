<script lang="ts" setup>
import type { ChatMessage } from '~~/types'
import { ChatState, ChatType } from '~~/types'
import ToolActivity from '~/components/tool/Activity.vue'
import ToolContact from '~/components/tool/Contact.vue'
import ToolCredits from '~/components/tool/Credits.vue'
import ToolDuplicated from '~/components/tool/Duplicated.vue'
import ToolExperiences from '~/components/tool/Experiences.vue'
import ToolHobbies from '~/components/tool/Hobbies.vue'
import ToolHomeLab from '~/components/tool/HomeLab.vue'
import ToolLanguage from '~/components/tool/Language.vue'
import ToolLocation from '~/components/tool/Location.vue'
import ToolProjects from '~/components/tool/Projects.vue'
import ToolResume from '~/components/tool/Resume.vue'
import ToolSkills from '~/components/tool/Skills.vue'
import ToolStats from '~/components/tool/Stats.vue'
import ToolTheme from '~/components/tool/Theme.vue'
import ToolUsesProxy from '~/components/tool/UsesProxy.vue'
import ToolWeather from '~/components/tool/Weather.vue'
import ToolWritings from '~/components/tool/Writings.vue'

const props = defineProps<{
  message: ChatMessage
}>()

const { locale, t } = useI18n({ useScope: 'global' })
const formatDate = computed(() => useDateFormat(props.message.createdAt, 'D MMMM YYYY, HH:mm', { locales: locale.value ?? 'en' }).value)

const componentMap: Record<ChatType, Component | undefined> = {
  [ChatType.INIT]: undefined,
  [ChatType.DUPLICATED]: ToolDuplicated,
  [ChatType.THEME]: ToolTheme,
  [ChatType.HARDWARE]: ToolUsesProxy,
  [ChatType.SOFTWARE]: ToolUsesProxy,
  [ChatType.HOMELAB]: ToolUsesProxy,
  [ChatType.IDE]: ToolUsesProxy,
  [ChatType.LANGUAGE]: ToolLanguage,
  [ChatType.STATS]: ToolStats,
  [ChatType.ACTIVITY]: ToolActivity,
  [ChatType.CONTACT]: ToolContact,
  [ChatType.WEATHER]: ToolWeather,
  [ChatType.LOCATION]: ToolLocation,
  [ChatType.SKILLS]: ToolSkills,
  [ChatType.PROJECTS]: ToolProjects,
  [ChatType.WRITINGS]: ToolWritings,
  [ChatType.HOBBIES]: ToolHobbies,
  [ChatType.EXPERIENCES]: ToolExperiences,
  [ChatType.STATUS]: ToolHomeLab,
  [ChatType.CREDITS]: ToolCredits,
  [ChatType.RESUME]: ToolResume,
}

const dynamicComponent = computed(() => componentMap[props.message.type])
const hasDynamicComponent = computed(() => Boolean(dynamicComponent.value))
</script>

<template>
  <div class="group space-y-2 duration-200">
    <div class="flex items-end gap-2.5">
      <img
        src="/yurier.jpeg"
        alt="Yurier Herrera"
        class="h-10 w-10 shrink-0 rounded-full object-cover shadow-[0_8px_22px_rgba(0,0,0,0.14)] ring-2 ring-white/80 dark:ring-white/10"
      >

      <div class="min-w-0 flex-1">
        <div
          v-if="message.state === ChatState.LOADING && message.fetchStates && message.fetchStates.length > 0"
          class="w-full rounded-[1.5rem] border border-white/60 bg-white/50 p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/[0.085] dark:bg-white/[0.20] dark:shadow-[0_18px_55px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.075)]"
        >
          <ChatLoading :fetch-states="message.fetchStates" :message-id="message.id" />
        </div>

        <div
          v-else
          :class="hasDynamicComponent
            ? 'w-full rounded-[1.75rem] border border-white/60 bg-white/50 p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl dark:border-white/[0.085] dark:bg-white/[0.20] dark:shadow-[0_18px_55px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.075)]'
            : 'w-fit max-w-[88%] rounded-[1.65rem] rounded-bl-[0.7rem] border border-white/70 bg-[#E9E9EB]/95 px-4 py-2.5 text-[15px] font-medium leading-snug text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md dark:border-white/[0.085] dark:bg-white/[0.13] dark:text-white dark:shadow-[0_10px_30px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.07)] sm:max-w-[68%] md:max-w-[58%]'"
        >
          <component
            :is="dynamicComponent"
            v-if="dynamicComponent"
            :type="message.type"
          />
          <i18n-t v-else-if="message.type === ChatType.INIT" :keypath="message.content || ''" tag="div">
            <template #space>
              <br>
            </template>
            <template #links>
              <div class="mt-3 inline-flex items-center gap-1 overflow-hidden rounded-full bg-black/5 p-1 dark:bg-white/10">
                <UButton
                  :label="t('tool.projects.link')"
                  to="/projects"
                  icon="i-ph-code-duotone"
                  variant="ghost"
                  color="primary"
                  size="sm"
                  class="rounded-full"
                />
                <div class="h-5 w-px bg-black/10 dark:bg-white/15" />
                <UButton
                  :label="t('tool.writings.link')"
                  to="/writings"
                  icon="i-ph-books-duotone"
                  variant="ghost"
                  color="primary"
                  size="sm"
                  class="rounded-full"
                />
              </div>
            </template>
          </i18n-t>
          <div v-else>
            {{ message }}
          </div>
        </div>
      </div>
    </div>
    <div class="ml-14 flex justify-start text-xs text-muted opacity-0 duration-500 group-hover:opacity-80">
      {{ formatDate }}
    </div>
  </div>
</template>
