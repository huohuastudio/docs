---
layout: page
sidebar: false
title: Lsky Pro+
---

<script setup>
import { onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'

const router = useRouter()
onMounted(() => router.go(withBase('/lsky-pro/guide/introduce')))
</script>

<div style="padding: 4rem 2rem; text-align: center;">
  <p>正在跳转到 <a href="./guide/introduce">Lsky Pro+ 文档</a>...</p>
</div>
