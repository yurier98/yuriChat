export default defineEventHandler(async (event) => {
  // Static data: no caching, so edits show immediately and currentTime stays fresh.
  setHeader(event, 'cache-control', 'no-store')

  return getLocation()
})
