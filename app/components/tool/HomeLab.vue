<script lang="ts" setup>

</script>

<template>
  <section class="prose dark:prose-invert">
    <i18n-t keypath="tool.homelab">
      <template #space>
        <br>
      </template>
      <template #status>
        <UButton
          label="Status"
          trailing-icon="i-simple-icons-uptimekuma"
          variant="link"
          class="p-0"
        />
      </template>
      <template #article>
        <UButton
          label="Homelab"
          trailing-icon="i-ph-rocket-launch-duotone"
          variant="link"
          to="/projects/artlab"
          class="p-0"
        />
      </template>
    </i18n-t>
  </section>
</template>
