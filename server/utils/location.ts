// Universidad de las Ciencias Informáticas (UCI) - Curitiba, Brasil
export function getLocation() {
  return {
    name: 'Universidad de las Ciencias Informáticas',
    shortName: 'UCI',
    address: 'Av. Sete de Setembro, Centro, Curitiba - PR, Brasil',
    coordinates: {
      latitude: -25.4284,
      longitude: -49.2733,
    },
    city: 'Curitiba',
    country: 'Brasil',
    countryCode: 'BR',
    flag: '🇧🇷',
    description: 'Universidad especializada en Ciencias de la Computación e Informática',
    website: 'https://www.uci.cu',
    founded: 2002,
    type: 'Universidad Pública',
    specialties: [
      'Ingeniería en Ciencias de Informáticas',
      'Ingeniería en Bioinformática',
      'Desarrollo de Software',
      'Inteligencia Artificial',
      'Ingeniería en Ciberseguridad',
    ],
    timezone: 'America/Sao_Paulo',
    currentTime: new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}
