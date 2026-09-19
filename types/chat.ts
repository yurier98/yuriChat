export enum ChatType {
  DUPLICATED = 'duplicated',
  WEATHER = 'weather',
  LOCATION = 'location',
  THEME = 'theme',
  LANGUAGE = 'language',
  PROJECTS = 'projects',
  WRITINGS = 'writings',
  EXPERIENCES = 'experiences',
  EDUCATION = 'education',
  SKILLS = 'skills',
  HOBBIES = 'hobbies',
  CREDITS = 'credits',
  CONTACT = 'contact',
  ACTIVITY = 'activity',
  RESUME = 'resume',
  INIT = 'init',
}

export enum ChatState {
  SENT = 'sent',
  LOADING = 'loading',
}

export enum ChatSender {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export enum ChatFetchState {
  THINKING = 'chat.state.thinking',
  FETCHING = 'chat.state.fetching',
  GENERATING = 'chat.state.generating',
  CHECKING = 'chat.state.checking',
  DONE = 'chat.state.done',
}

export interface ChatMessage {
  id: number
  content: string | null
  sender: ChatSender
  type: ChatType
  state: ChatState
  fetchStates?: ChatFetchState[]
  createdAt: Date
}

// Order matters: groups and items are listed by how often visitors reach for them,
// most requested first. Do NOT re-add an alphabetical `.sort()` here — the previous one
// sorted by the i18n KEY, so it silently overrode any deliberate order.
export const ChatMessages = [
  {
    id: 'userinfo',
    label: 'Yurier Herrera',
    items: [
      {
        label: 'command.projects.label',
        icon: 'i-ph-code-duotone',
        prompt: 'command.projects.prompt',
        type: ChatType.PROJECTS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.CHECKING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.skills.label',
        icon: 'i-ph-rocket-duotone',
        prompt: 'command.skills.prompt',
        type: ChatType.SKILLS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.CHECKING],
      },
      {
        label: 'command.experiences.label',
        icon: 'i-ph-briefcase-duotone',
        prompt: 'command.experiences.prompt',
        type: ChatType.EXPERIENCES,
        fetchStates: [ChatFetchState.CHECKING],
      },
      {
        label: 'command.education.label',
        icon: 'i-ph-graduation-cap-duotone',
        prompt: 'command.education.prompt',
        type: ChatType.EDUCATION,
        fetchStates: [ChatFetchState.CHECKING],
      },
      {
        label: 'command.resume.label',
        icon: 'i-ph-address-book-duotone',
        prompt: 'command.resume.prompt',
        type: ChatType.RESUME,
        fetchStates: [ChatFetchState.CHECKING],
      },
      {
        label: 'command.contact.label',
        icon: 'i-ph-envelope-duotone',
        prompt: 'command.contact.prompt',
        type: ChatType.CONTACT,
        fetchStates: [ChatFetchState.CHECKING],
      },
      {
        label: 'command.writings.label',
        icon: 'i-ph-books-duotone',
        prompt: 'command.writings.prompt',
        type: ChatType.WRITINGS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.hobbies.label',
        icon: 'i-ph-heart-duotone',
        prompt: 'command.hobbies.prompt',
        type: ChatType.HOBBIES,
        fetchStates: [ChatFetchState.CHECKING],
      },
      {
        label: 'command.credits.label',
        icon: 'i-ph-star-duotone',
        prompt: 'command.credits.prompt',
        type: ChatType.CREDITS,
      },
    ],
  },
  {
    id: 'actions',
    label: 'Components',
    items: [
      {
        label: 'command.location.label',
        icon: 'i-ph-map-pin-area-duotone',
        prompt: 'command.location.prompt',
        type: ChatType.LOCATION,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.weather.label',
        icon: 'i-ph-cloud-rain-duotone',
        prompt: 'command.weather.prompt',
        type: ChatType.WEATHER,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.activity.label',
        icon: 'i-ph-activity',
        prompt: 'command.activity.prompt',
        type: ChatType.ACTIVITY,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
    ],
  },
  {
    id: 'interface',
    label: 'Interface', // TODO: use translation : command.interface
    items: [
      {
        label: 'command.theme.label',
        icon: 'i-ph-lightbulb-filament-duotone',
        prompt: 'command.theme.prompt',
        type: ChatType.THEME,
        fetchStates: [ChatFetchState.THINKING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.language.label',
        icon: 'i-ph-translate-duotone',
        prompt: 'command.language.prompt',
        type: ChatType.LANGUAGE,
        fetchStates: [ChatFetchState.THINKING, ChatFetchState.GENERATING],
      },
    ],
  },
]
