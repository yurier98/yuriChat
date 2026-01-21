<script lang="ts" setup>
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <UCard class="mt-8 shadow-sm bg-white dark:bg-neutral-900">
    <NuxtImg
      src="/arthur-pro.webp"
      alt="Arthur Danjou"
      class="w-24 h-24 rounded-full float-left mr-4 mb-4"
    />
    <i18n-t
      keypath="post.footer.thanks"
      tag="p"
      class="text-neutral-600 dark:text-neutral-400"
    >
      <template #linkedin>
        <PostLink
          href="https://go.arthurdanjou.fr/linkedin"
          icon="i-ph-linkedin-logo-duotone"
          label="LinkedIn"
          target="_blank"
          class="translate-y-1"
        />
      </template>
      <template #github>
        <PostLink
          href="https://go.arthurdanjou.fr/github"
          icon="i-ph-github-logo-duotone"
          label="GitHub"
          target="_blank"
          class="translate-y-1"
        />
      </template>
      <template #comment>
        <strong class="text-neutral-800 dark:text-neutral-200">{{ t('post.footer.comment') }}</strong>
      </template>
      <template #name>
        <strong class="text-neutral-800 dark:text-neutral-200">Arthur</strong>
      </template>
      <template #jump>
        <br> <br>
      </template>
    </i18n-t>
  </UCard>
</template>
