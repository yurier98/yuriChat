import { ChatFetchState, ChatMessages, ChatSender, ChatType } from '~~/types/chat'

export function useChat() {
  const { addMessage, checkForDuplicateMessages, deleteMessage, cleanDuplicatedMessages } = useChatStore()

  async function submitMessage(type: ChatType, prompt: string, fetchStates: ChatFetchState[]) {
    const duplicates = checkForDuplicateMessages(type)
    addMessage(
      type,
      prompt,
      ChatSender.USER,
      [],
    )
    await new Promise(resolve => setTimeout(resolve, 700))
    if (duplicates.length > 0) {
      duplicates.forEach(msg => deleteMessage(msg.id, msg.type))
      cleanDuplicatedMessages()
      addMessage(
        ChatType.DUPLICATED,
        '',
        ChatSender.ARTHUR,
        [ChatFetchState.THINKING, ChatFetchState.DONE],
      )
      await new Promise(resolve => setTimeout(resolve, 700))
    }
    addMessage(
      type,
      '',
      ChatSender.ARTHUR,
      fetchStates,
    )
  }

  return {
    messages: ChatMessages,
    submitMessage,
  }
}
