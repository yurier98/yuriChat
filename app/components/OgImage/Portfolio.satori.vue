<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  subtitle?: string
  footer?: string
}>(), {
  footer: 'Yurier Herrera — Software Engineer & Entrepreneur',
})
</script>

<template>
  <!-- Mirrors the site's content cards: page background #f8f8f8 (var(--ui-bg)),
       a card with the same blue→indigo tint used by the education/experience
       cards, the DM Sans typeface and the #0A84FF primary accent.
       satori constraints: flex only (no grid), no unsupported positioning. -->
  <div
    class="w-full h-full flex flex-col"
    style="background-color: #f8f8f8; font-family: 'DM Sans', sans-serif; padding: 52px;"
  >
    <div
      class="w-full h-full flex flex-row items-center"
      style="background-image: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); border: 2px solid #dbe3ef; border-radius: 34px; padding: 0 62px; gap: 46px;"
    >
      <img
        src="/profile.png"
        width="188"
        height="188"
        style="border-radius: 9999px; border: 6px solid #ffffff;"
      >

      <div class="flex-1 flex flex-col" style="min-width: 0;">
        <div style="color: #0f172a; font-size: 58px; font-weight: 700; line-height: 1.07;">
          {{ title }}
        </div>

        <div
          v-if="subtitle"
          style="color: #0A84FF; font-size: 25px; line-height: 1.3; margin-top: 14px;"
        >
          {{ subtitle }}
        </div>

        <div v-if="footer" style="height: 2px; background-color: #c7d2fe; margin-top: 26px;" />

        <div v-if="footer" style="color: #475569; font-size: 19px; margin-top: 16px;">
          {{ footer }}
        </div>
      </div>
    </div>
  </div>
</template>
