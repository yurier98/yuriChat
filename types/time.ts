type TimeUnit = (n: number, past?: boolean) => string
type TimeFormatter = (n: string) => string

interface ActivityMessages {
  justNow: string
  past: TimeFormatter
  future: TimeFormatter
  month: TimeUnit
  year: TimeUnit
  day: TimeUnit
  week: TimeUnit
  hour: TimeUnit
  minute: TimeUnit
  second: TimeUnit
  invalid: string
}

function createTimeUnit(singular: string, plural: string, pastSingular?: string, futureSingular?: string): TimeUnit {
  return (n: number, past = true) => {
    if (n === 1) {
      return past ? (pastSingular || `last ${singular}`) : (futureSingular || `next ${singular}`)
    }
    return `${n} ${plural}`
  }
}

function createSimpleTimeUnit(unit: string): TimeUnit {
  return (n: number) => `${n} ${unit}${n > 1 ? 's' : ''}`
}

export const activityMessages: Record<'en' | 'fr' | 'es', ActivityMessages> = {
  en: {
    justNow: 'just now',
    past: (n: string) => n.match(/\d/) ? `${n} ago` : n,
    future: (n: string) => n.match(/\d/) ? `in ${n}` : n,
    month: createTimeUnit('month', 'months'),
    year: createTimeUnit('year', 'years'),
    day: createTimeUnit('day', 'days', 'yesterday', 'tomorrow'),
    week: createTimeUnit('week', 'weeks'),
    hour: createSimpleTimeUnit('hour'),
    minute: createSimpleTimeUnit('minute'),
    second: createSimpleTimeUnit('second'),
    invalid: '',
  },
  fr: {
    justNow: 'à l\'instant',
    past: (n: string) => n.match(/\d/) ? `il y a ${n}` : n,
    future: (n: string) => n.match(/\d/) ? `dans ${n}` : n,
    month: (n: number, past = true) => n === 1 ? (past ? 'le mois dernier' : 'le mois prochain') : `${n} mois`,
    year: (n: number, past = true) => n === 1 ? (past ? 'l\'année dernière' : 'l\'année prochaine') : `${n} ans`,
    day: (n: number, past = true) => n === 1 ? (past ? 'hier' : 'demain') : `${n} jours`,
    week: (n: number, past = true) => n === 1 ? (past ? 'la semaine dernière' : 'la semaine prochaine') : `${n} semaines`,
    hour: createSimpleTimeUnit('heure'),
    minute: createSimpleTimeUnit('minute'),
    second: createSimpleTimeUnit('seconde'),
    invalid: '',
  },
  es: {
    justNow: 'justo ahora',
    past: (n: string) => n.match(/\d/) ? `hace ${n}` : n,
    future: (n: string) => n.match(/\d/) ? `dentro de ${n}` : n,
    month: (n: number, past = true) => n === 1 ? (past ? 'el mes pasado' : 'el próximo mes') : `${n} meses`,
    year: (n: number, past = true) => n === 1 ? (past ? 'el año pasado' : 'el próximo año') : `${n} años`,
    day: (n: number, past = true) => n === 1 ? (past ? 'ayer' : 'mañana') : `${n} días`,
    week: (n: number, past = true) => n === 1 ? (past ? 'la semana pasada' : 'la próxima semana') : `${n} semanas`,
    hour: createSimpleTimeUnit('hora'),
    minute: createSimpleTimeUnit('minuto'),
    second: createSimpleTimeUnit('segundo'),
    invalid: '',
  },
}
