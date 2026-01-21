import type { ChatMessage } from '~~/types'
import { ChatFetchState, ChatSender, ChatState, ChatType } from '~~/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  let id = 0

  const canSend = computed(() => {
    return !messages.value.some(msg => msg.state === ChatState.LOADING)
  })

  function checkForDuplicateMessages(type: ChatType) {
    return messages.value.filter(msg => msg.type === type)
  }

  function deleteMessage(id: number, type: ChatType) {
    const message = messages.value.find(msg => msg.id === id && msg.type === type)
    messages.value.splice(messages.value.indexOf(message!), 1)
  }

  function cleanDuplicatedMessages() {
    const duplicated = messages.value.filter(msg => msg.type === ChatType.DUPLICATED)
    duplicated.forEach(msg => messages.value.splice(messages.value.indexOf(msg), 1))
  }

  function addMessage(type: ChatType, content: string, sender: ChatSender, fetchStates: ChatFetchState[]) {
    if (sender === ChatSender.ARTHUR) {
      const message: ChatMessage = {
        id: id++,
        type,
        content: null,
        sender,
        state: ChatState.LOADING,
        fetchStates: [...fetchStates, ChatFetchState.DONE],
        createdAt: new Date(),
      }

      messages.value.push(message)
    }
    else {
      messages.value.push({
        id: id++,
        type,
        content,
        sender,
        state: ChatState.SENT,
        fetchStates: [ChatFetchState.DONE],
        createdAt: new Date(),
      })
    }
  }

  function clearMessages() {
    messages.value.splice(0, messages.value.length)
    id = 0
  }

  function setLoadingState(messageId: number, loadingState: ChatState) {
    const message = messages.value.find(msg => msg.id === messageId)
    if (message) {
      message.state = loadingState
    }
  }
  return { messages, addMessage, clearMessages, canSend, setLoadingState, checkForDuplicateMessages, deleteMessage, cleanDuplicatedMessages }
})
