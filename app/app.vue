<script lang="ts" setup>
useHead({
  link: [{ rel: 'icon', type: 'image/webp', href: '/favicon.webp' }],
})

const route = useRoute()
const { messages } = useChatStore()
const head = useLocaleHead()
</script>

<template>
  <UApp>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <template v-for="link in head.link" :key="link.key">
          <Link :id="link.key" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.key">
          <Meta :id="meta.key" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        <slot />
      </Body>
    </Html>
    <NuxtLoadingIndicator color="#808080" />
    <AppBackground />
    <ChatCommandPalette
      v-motion
      :active="messages.length > 0"
      :mode="route.path.includes('/projects') || route.path.includes('/writings') ? 'work' : 'chat'"
      :initial="{
        opacity: 0,
        y: 200,
        scale: 0.6,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: route.path === '/' ? 1800 : 0,
          ease: 'easeIn',
        },
      }"
    />
    <NuxtPage />
  </UApp>
</template>

<style>
@reference "@/assets/css/main.css";

/* Transition switcher */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

/* Theme switcher */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
