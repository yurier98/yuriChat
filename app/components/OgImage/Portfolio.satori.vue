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
  <!-- Mirrors the site's content cards: the blue→indigo card tint, the #f8f8f8
       page background, DM Sans and the #0A84FF accent.

       Deliberately NO Tailwind classes here. satori scans every font-family in
       the component's CSS, and Tailwind's preflight adds its default stack
       ("Segoe UI", "Helvetica Neue", Arial), which satori then tries to resolve
       and warns about on every start. Inline styles keep the scanned CSS to the
       single font we actually use. -->
  <div
    style="width:100%; height:100%; display:flex; flex-direction:column; background-color:#f8f8f8; font-family:'DM Sans'; padding:52px;"
  >
    <div
      style="width:100%; height:100%; display:flex; flex-direction:row; align-items:center; background-image:linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); border:2px solid #dbe3ef; border-radius:34px; padding-left:62px; padding-right:62px;"
    >
      <img
        src="/profile.png"
        width="188"
        height="188"
        style="border-radius:9999px; border:6px solid #ffffff;"
      >

      <div style="flex:1; min-width:0; display:flex; flex-direction:column; margin-left:46px;">
        <div style="color:#0f172a; font-size:58px; font-weight:700; line-height:1.07;">
          {{ title }}
        </div>

        <div
          v-if="subtitle"
          style="color:#0A84FF; font-size:25px; line-height:1.3; margin-top:14px;"
        >
          {{ subtitle }}
        </div>

        <div v-if="footer" style="height:2px; background-color:#c7d2fe; margin-top:26px;" />

        <div v-if="footer" style="color:#475569; font-size:19px; margin-top:16px;">
          {{ footer }}
        </div>
      </div>
    </div>
  </div>
</template>
