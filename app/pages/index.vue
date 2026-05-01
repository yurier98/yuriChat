<script lang="ts" setup>
import { ChatSender, ChatState, ChatType } from '~~/types'

useSeoMeta({
  title: 'Yurier Herrera - Software Engineer,  IT Project Manager, UX/UI Designer',
  description: 'Profesional innovador. Destaco por mi capacidad para liderar equipos multidisciplinarios utilizando metodologías ágiles (SCRUM) y las buenas prácticas del PMBOK, logrando resultados excepcionales en la entrega de soluciones tecnológicas.',
})

const { messages } = useChatStore()
const parents = useTemplateRef('parents')
const { height } = useElementBounding(parents)

const { locale } = useI18n({ useScope: 'global' })
const lastLang = ref(locale.value)
watch(
  height,
  async () => {
    await nextTick()
    if (lastLang.value === locale.value && parents.value && messages.length > 0) {
      const children = parents.value.children
      if (children.length > 0 && children[children.length - 1]) {
        const lastChild = children[children.length - 1] as HTMLElement
        window.scrollTo({
          top: Math.max(lastChild.offsetTop - 96, 0),
          behavior: 'smooth',
        })
      }
      else {
        window.scrollTo({
          top: parents.value.scrollHeight,
          behavior: 'smooth',
        })
      }
    }
    lastLang.value = locale.value
  },
)
</script>

<template>
  <UContainer class="pb-32">
    <ChatMain />
    <div ref="parents" class="mx-auto mb-16 max-w-4xl space-y-5 md:mb-28">
      <ChatMessageContainer
        v-motion
        :initial="{
          opacity: 0,
          y: 24,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 850,
            ease: 'easeOut',
          },
        }"
        :message="{
          id: 0,
          content: 'main.intro',
          sender: ChatSender.ASSISTANT,
          state: ChatState.SENT,
          type: ChatType.INIT,
          createdAt: new Date(),
        }"
      />
      <ChatMessageContainer
        v-motion
        :initial="{
          opacity: 0,
          y: 24,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1150,
            ease: 'easeOut',
          },
        }"
        :message="{
          content: 'main.visitor',
          id: 0,
          sender: ChatSender.USER,
          state: ChatState.SENT,
          type: ChatType.INIT,
          createdAt: new Date(),
        }"
      />
      <ChatMessageContainer
        v-motion
        :initial="{
          opacity: 0,
          y: 24,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1450,
            ease: 'easeOut',
          },
        }"
        :message="{
          content: 'main.ready',
          id: 0,
          sender: ChatSender.ASSISTANT,
          state: ChatState.SENT,
          type: ChatType.INIT,
          createdAt: new Date(),
        }"
      />
      <ChatMessageContainer
        v-for="message in messages"
        :id="message.id"
        :key="message.id"
        v-motion
        :message="message"
        :initial="{
          opacity: 0,
          scale: 0.6,
        }"
        :enter="{
          opacity: 1,
          scale: 1,
          transition: { ease: 'easeOut' },
        }"
      />
    </div>
  </UContainer>
</template>
