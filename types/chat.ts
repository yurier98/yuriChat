export enum ChatType {
  DUPLICATED = 'duplicated',
  WEATHER = 'weather',
  LOCATION = 'location',
  THEME = 'theme',
  LANGUAGE = 'language',
  PROJECTS = 'projects',
  WRITINGS = 'writings',
  EXPERIENCES = 'experiences',
  SKILLS = 'skills',
  HOBBIES = 'hobbies',
  IDE = 'ide',
  HARDWARE = 'hardware',
  SOFTWARE = 'software',
  HOMELAB = 'homelab',
  STATUS = 'status',
  CREDITS = 'credits',
  CONTACT = 'contact',
  STATS = 'stats',
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

export const ChatMessages = [
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
        label: 'command.stats.label',
        icon: 'i-ph-projector-screen-chart-duotone',
        prompt: 'command.stats.prompt',
        type: ChatType.STATS,
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
      {
        label: 'command.status.label',
        icon: 'i-ph-warning-duotone',
        prompt: 'command.status.prompt',
        type: ChatType.STATUS,
        fetchStates: [ChatFetchState.FETCHING],
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
  {
    id: 'userinfo',
    label: 'Yurier Herrera',
    items: [
      {
        label: 'command.credits.label',
        icon: 'i-ph-star-duotone',
        prompt: 'command.credits.prompt',
        type: ChatType.CREDITS,
      },
      {
        label: 'command.projects.label',
        icon: 'i-ph-code-duotone',
        prompt: 'command.projects.prompt',
        type: ChatType.PROJECTS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.CHECKING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.writings.label',
        icon: 'i-ph-books-duotone',
        prompt: 'command.writings.prompt',
        type: ChatType.WRITINGS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.GENERATING],
      },
      {
        label: 'command.experiences.label',
        icon: 'i-ph-briefcase-duotone',
        prompt: 'command.experiences.prompt',
        type: ChatType.EXPERIENCES,
        fetchStates: [ChatFetchState.CHECKING],
      },
      {
        label: 'command.skills.label',
        icon: 'i-ph-rocket-duotone',
        prompt: 'command.skills.prompt',
        type: ChatType.SKILLS,
        fetchStates: [ChatFetchState.FETCHING, ChatFetchState.CHECKING],
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
        label: 'command.hobbies.label',
        icon: 'i-ph-heart-duotone',
        prompt: 'command.hobbies.prompt',
        type: ChatType.HOBBIES,
        fetchStates: [ChatFetchState.CHECKING],
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
  {
    id: 'uses',
    label: 'Uses',
    items: [
      {
        label: 'command.hardware.label',
        icon: 'i-ph-chalkboard-simple-duotone',
        prompt: 'command.hardware.prompt',
        type: ChatType.HARDWARE,
        fetchStates: [ChatFetchState.FETCHING],
      },
      {
        label: 'command.software.label',
        icon: 'i-ph-app-store-logo-duotone',
        prompt: 'command.software.prompt',
        type: ChatType.SOFTWARE,
        fetchStates: [ChatFetchState.FETCHING],
      },
      {
        label: 'command.homelab.label',
        icon: 'i-ph-computer-tower-duotone',
        prompt: 'command.homelab.prompt',
        type: ChatType.HOMELAB,
        fetchStates: [ChatFetchState.FETCHING],
      },
      {
        label: 'command.ide.label',
        icon: 'i-ph-code-simple-duotone',
        prompt: 'command.ide.prompt',
        type: ChatType.IDE,
        fetchStates: [ChatFetchState.FETCHING],
      },
    ],
  },
]
