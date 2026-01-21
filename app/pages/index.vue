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
      if (children.length > 0 && children[children.length - 2]) {
        const lastChild = children[children.length - 2] as HTMLElement
        window.scrollTo({
          top: lastChild.offsetTop - 10,
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
  <UContainer>
    <ChatMain />
    <div ref="parents" class="space-y-4 md:my-32 mb-16">
      <ChatMessageContainer
        v-motion
        :initial="{
          opacity: 0,
          y: 200,
          scale: 0.6,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: 900,
            ease: 'easeOut',
          },
        }"
        :message="{
          id: 0,
          content: 'main.question',
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
          y: 200,
          scale: 0.6,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: 1200,
            ease: 'easeOut',
          },
        }"
        :message="{
          content: 'main.about',
          id: 0,
          sender: ChatSender.ARTHUR,
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
