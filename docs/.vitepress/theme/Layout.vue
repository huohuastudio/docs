<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, onMounted, provide, ref, watchEffect } from 'vue'
import { DEFAULT_PRODUCT, PRODUCTS } from '../products'

const { isDark, site, theme } = useData()
const { Layout } = DefaultTheme
const route = useRoute()

const isEmbed = ref(false)
onMounted(() => {
  isEmbed.value = new URLSearchParams(window.location.search).get('embed') === '1'
  if (isEmbed.value) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && window.parent !== window) {
        window.parent.postMessage('help-doc-close', '*')
      }
    })
  }
})

const currentProduct = computed(
  () => PRODUCTS.find((p) => route.path.startsWith(p.base)),
)

const navTitle = computed(
  () => currentProduct.value ?? { name: site.value.title || DEFAULT_PRODUCT.name, logo: DEFAULT_PRODUCT.logo },
)

watchEffect(() => {
  const github = currentProduct.value?.github
  theme.value.socialLinks = github
    ? [{ icon: 'github', link: github }]
    : []
})

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
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
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
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <Layout :class="{ 'embed-mode': isEmbed }">
    <template #nav-bar-title-before>
      <img :src="withBase(navTitle.logo)" :alt="navTitle.name" class="product-title__logo" />
      <span class="product-title__name">{{ navTitle.name }}</span>
    </template>

    <template #doc-before>
      <div v-if="currentProduct?.devBanner && !isEmbed" class="dev-banner">
        {{ currentProduct.devBanner }}
      </div>
    </template>
  </Layout>
</template>

<style>
.dev-banner {
  padding: 12px 16px;
  margin-bottom: 24px;
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;
  line-height: 1.5;
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

.VPNavBarTitle .title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.product-title__logo {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
  flex-shrink: 0;
}

.product-title__name {
  white-space: nowrap;
  font-size: 16px;
}
</style>
