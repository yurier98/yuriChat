export default defineEventHandler(async (event) => {
  const { discord } = useRuntimeConfig(event)

  try {
    return await $fetch(`https://api.lanyard.rest/v1/users/${discord.userId}`)
  }
  catch (error) {
    console.error('[activity] Failed to fetch Lanyard presence:', error)
    return { data: { activities: [] } }
  }
})
