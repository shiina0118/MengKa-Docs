<script setup lang="ts">
import { nextTick, ref, useId } from "vue";
import { withBase } from "vitepress";
import { useApiTransport, type ApiTransport } from "../api-transport";

const { transport, select } = useApiTransport();
const root = ref<HTMLElement>();
const id = `api-call-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const tabs: { value: ApiTransport; label: string }[] = [
  { value: "websocket", label: "WebSocket" },
  { value: "http", label: "HTTP" },
];

function navigate(event: KeyboardEvent, index: number) {
  let next: number;
  switch (event.key) {
    case "ArrowRight": next = (index + 1) % tabs.length; break;
    case "ArrowLeft": next = (index + tabs.length - 1) % tabs.length; break;
    case "Home": next = 0; break;
    case "End": next = tabs.length - 1; break;
    default: return;
  }
  event.preventDefault();
  select(tabs[next].value);
  nextTick(() => root.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus());
}
</script>

<template>
  <div ref="root" class="api-call-tabs">
    <div class="api-call-tabs__list" role="tablist" aria-label="API 调用方式">
      <button
        v-for="(tab, index) in tabs"
        :id="`${id}-${tab.value}-tab`"
        :key="tab.value"
        type="button"
        role="tab"
        :aria-selected="transport === tab.value"
        :aria-controls="`${id}-${tab.value}-panel`"
        :tabindex="transport === tab.value ? 0 : -1"
        @click="select(tab.value)"
        @keydown="navigate($event, index)"
      >{{ tab.label }}</button>
    </div>
    <section
      v-show="transport === 'websocket'"
      :id="`${id}-websocket-panel`"
      role="tabpanel"
      :aria-labelledby="`${id}-websocket-tab`"
      class="api-call-tabs__panel"
      tabindex="0"
    >
      <p class="api-call-tabs__hint">正向与反向 WebSocket 通用。<code>id</code> 由插件自行生成，用于匹配 <code>action_result</code>。<a :href="withBase('/guide/protocol')">WebSocket API 格式</a></p>
      <slot name="websocket" />
    </section>
    <section
      v-show="transport === 'http'"
      :id="`${id}-http-panel`"
      role="tabpanel"
      :aria-labelledby="`${id}-http-tab`"
      class="api-call-tabs__panel"
      tabindex="0"
    >
      <p class="api-call-tabs__hint">将地址、端口、插件服务令牌和示例参数替换为实际值。HTTP 成功响应读取 <code>data</code>；失败检查 <code>ok</code> 和 <code>error</code>。<a :href="withBase('/guide/forward-http')">HTTP 接入说明</a></p>
      <slot name="http" />
    </section>
  </div>
</template>

<style scoped>
.api-call-tabs {
  min-width: 0;
  margin: 16px 0 24px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.api-call-tabs__list {
  display: flex;
  gap: 24px;
  padding: 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.api-call-tabs__list button {
  padding: 10px 0;
  border-bottom: 2px solid transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
}
.api-call-tabs__list button[aria-selected="true"] {
  border-bottom-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.api-call-tabs__list button:focus-visible,
.api-call-tabs__panel:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.api-call-tabs__panel {
  min-width: 0;
  padding: 16px;
}
.api-call-tabs__hint {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.7;
}
.api-call-tabs__panel :deep(div[class*="language-"]) {
  margin: 12px 0;
  border-radius: 6px;
}
.api-call-tabs__panel :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
