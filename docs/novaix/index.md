---
layout: page
sidebar: false
title: Novaix
---

<script setup>
import { onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'

const router = useRouter()
onMounted(() => router.go(withBase('/novaix/introduce')))
</script>

<div style="padding: 4rem 2rem; text-align: center;">
  <p>正在跳转到 <a href="./introduce">Novaix 文档</a>...</p>
</div>
