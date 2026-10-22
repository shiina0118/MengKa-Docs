<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { page } = useData();
// transformPageData sets API page titles from the sidebar; the H1 stays the API identifier.
const name = computed(() => {
  const path = page.value.relativePath;
  if (!path.startsWith("api/")) return "";
  const id = path.slice(4).replace(/\.md$/, "");
  return page.value.title && page.value.title !== id ? page.value.title : "";
});
</script>

<template>
  <p v-if="name" class="api-page-name">{{ name }}</p>
</template>

<style scoped>
.api-page-name {
  margin: 0 0 4px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
}
</style>
