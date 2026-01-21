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
</script>

<template>
  <div class="group space-y-2 duration-200 relative">
    <div class="flex flex-col-reverse gap-2 items-start md:flex-row-reverse">
      <UCard
        v-if="message.state === ChatState.LOADING && message.fetchStates && message.fetchStates.length > 0"
        variant="soft"
        class="mt-1 w-full bg-transparent"
        :ui="{ body: 'p-0 sm:p-0', header: 'p-0 sm:p-0', footer: 'p-0 sm:p-0' }"
      >
        <ChatLoading :fetch-states="message.fetchStates" :message-id="message.id" />
      </UCard>
      <UCard
        v-else
        v-motion
        variant="soft"
        class="mt-1 w-full max-w-none bg-transparent"
        :ui="{ body: 'p-0 sm:p-0', header: 'p-0 sm:p-0', footer: 'p-0 sm:p-0' }"
        :initial="{
          opacity: 0,
          y: 20,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { ease: 'easeInOut', duration: 300, delay: 500 },
        }"
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
            <div class="inline-flex items-center gap-2 mb-2">
              <UButton
                :label="t('tool.projects.link')"
                to="/projects"
                icon="i-ph-code-duotone"
                variant="outline"
                size="sm"
                class="cursor-pointer translate-y-1"
              />
              <UButton
                :label="t('tool.writings.link')"
                to="/writings"
                icon="i-ph-books-duotone"
                variant="outline"
                size="sm"
                class="cursor-pointer translate-y-1"
              />
            </div>
          </template>
        </i18n-t>
        <div v-else>
          {{ message }}
        </div>
      </UCard>
      <div class="flex items-center gap-2 lg:absolute lg:-left-12">
        <UAvatar src="/avatar.webp" size="lg" class="shadow-lg" alt="Avatar" />
        <span class="md:hidden">Yurier Herrera</span>
      </div>
    </div>
    <div class="text-muted-foreground opacity-0 group-hover:opacity-80 duration-500 flex text-xs italic justify-start">
      {{ formatDate }}
    </div>
  </div>
</template>
