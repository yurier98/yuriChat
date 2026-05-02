export default defineCachedEventHandler(async () => {
  // Universidad de las Ciencias Informáticas (UCI) - La Habana, Cuba
  const uciLocation = {
    name: 'Universidad de las Ciencias Informáticas',
    shortName: 'UCI',
    address: 'Carretera a San Antonio de los Baños, Km 2½, La Habana, Cuba',
    coordinates: {
      latitude: 22.986160,
      longitude: -82.465181,
    },
    city: 'La Habana',
    country: 'Cuba',
    countryCode: 'CU',
    flag: '🇨🇺',
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
    timezone: 'America/Havana',
    currentTime: new Date().toLocaleString('es-CU', {
      timeZone: 'America/Havana',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }

  return uciLocation
}, {
  maxAge: 60 * 60, // 1 hour cache
})
