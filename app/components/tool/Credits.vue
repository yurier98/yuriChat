<script lang="ts" setup>
const { t } = useI18n({ useScope: 'global' })

const year = ref(useNow().value.getFullYear())
</script>

<template>
  <section class="prose dark:prose-invert">
    <i18n-t keypath="tool.credits.made">
      <template #nuxt>
        <UButton
          label="Nuxt Stack (Core, UI, I18n, Content)"
          trailing-icon="i-logos-nuxt-icon"
          variant="link"
          to="https://nuxt.com"
          target="_blank"
          class="px-0"
        />
      </template>
      <template #cloudflare>
        <UButton
          label="Cloudflare"
          trailing-icon="i-logos-cloudflare-icon"
          variant="link"
          to="https://cloudflare.com"
          target="_blank"
          class="px-0"
        />
      </template>
    </i18n-t>
    <p>{{ t('tool.credits.heart') }}</p>
    <i18n-t keypath="tool.credits.chat" tag="p">
      <template #chat>
        <UTooltip
          arrow
          :content="{
            position: 'bottom',
            sideOffset: 0,
          }"
          :delay-duration="0"
          :text="t('tool.credits.tooltip')"
        >
          <strong>ArtChat</strong>
        </UTooltip>
      </template>
    </i18n-t>
    <p>{{ t('tool.credits.thank') }}</p>
    <p>{{ t('tool.credits.message') }}</p>
    <i18n-t keypath="tool.credits.copyrights" tag="p">
      <template #year>
        {{ year }}
      </template>
    </i18n-t>
  </section>
</template>
