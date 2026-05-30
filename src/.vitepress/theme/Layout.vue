<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, provide } from 'vue'
import { useRoute } from 'vitepress'

const { isDark } = useData()
const { Layout } = DefaultTheme
const route = useRoute()
const isNovaix = computed(() => route.path.startsWith('/novaix/'))

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="isNovaix" class="dev-banner">
        Novaix 目前处于早期开发阶段，功能尚未稳定，可能存在严重的 Bug。请勿用于生产环境。
      </div>
    </template>
  </Layout>
</template>

<style>
.dev-banner {
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  text-align: center;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
}

.dark .dev-banner {
  background-color: #422006;
  border-color: #b45309;
  color: #fcd34d;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
