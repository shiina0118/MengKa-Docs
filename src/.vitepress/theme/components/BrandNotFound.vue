<script setup lang="ts">
import { withBase } from "vitepress";
</script>

<template>
  <section class="lost-page" aria-labelledby="lost-title">
    <div class="lost-layout">
      <div class="lost-copy">
        <p class="lost-eyebrow">MENGKA NT · DOCS</p>
        <p class="lost-code" aria-label="错误 404">4<span>0</span>4</p>
        <p class="lost-kicker">PAGE NOT FOUND</p>
        <h1 id="lost-title">这一页，<br />暂时迷路了。</h1>
        <p class="lost-description">你寻找的文档可能已搬家，或地址有一点偏差。<br class="lost-desktop-break" />没关系，跟着萌卡回到熟悉的地方吧。</p>
        <div class="lost-actions">
          <a class="lost-primary" :href="withBase('/')">返回文档首页 <span aria-hidden="true">↗</span></a>
          <a class="lost-secondary" :href="withBase('/guide/')">快速开始 <span aria-hidden="true">→</span></a>
        </div>
        <p class="lost-hint">也可以前往 <a :href="withBase('/api/')">API 总览 <span aria-hidden="true">↗</span></a>，继续你的探索。</p>
      </div>

      <div class="lost-art" aria-hidden="true">
        <img class="lost-character" :src="withBase('/brand/mengka-404-lolita-blue-fullbody.webp')" alt="" width="800" height="1200" draggable="false" />
      </div>
    </div>
    <footer class="lost-footer"><span>萌卡NT <span class="lost-footer-separator">/</span> 开发文档</span><span>偶尔迷路，也会遇见新的风景。</span></footer>
  </section>
</template>

<style scoped>
.lost-page {
  --lost-ink: var(--vp-c-text-1);
  --lost-muted: var(--vp-c-text-2);
  --lost-blue: var(--vp-c-brand-1);
  --lost-line: var(--vp-c-divider);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100svh - var(--vp-nav-height, 64px));
  overflow: hidden;
  padding: 48px max(32px, calc((100vw - 1120px) / 2)) 0;
  background: var(--vp-c-bg);
  color: var(--lost-ink);
  font-family: var(--vp-font-family-base);
}
.lost-layout { display: grid; grid-template-columns: 1fr 1.08fr; align-items: center; gap: 24px; width: 100%; margin: auto 0; padding: 20px 0 44px; }
.lost-copy { position: relative; z-index: 2; padding: 16px 0; }
.lost-eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 28px; font-size: 11px; font-weight: 600; letter-spacing: 2.3px; color: var(--lost-muted); }
.lost-code { position: relative; display: inline-flex; margin: 0; font-size: clamp(112px, 12vw, 164px); font-weight: 800; line-height: .95; letter-spacing: -10px; }
.lost-code > span:first-child { color: var(--lost-blue); }
.lost-kicker { margin: 14px 0 26px; font-size: 10px; font-weight: 600; letter-spacing: 4.5px; color: var(--lost-muted); }
.lost-copy h1 { margin: 0; font-size: clamp(32px, 3.1vw, 43px); font-weight: 650; letter-spacing: -1.5px; line-height: 1.45; color: var(--lost-ink); }
.lost-description { margin: 20px 0 0; color: var(--lost-muted); font-size: 14px; line-height: 1.95; }
.lost-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.lost-actions a, .lost-actions button { display: inline-flex; justify-content: center; align-items: center; gap: 20px; min-height: 46px; border-radius: 9px; padding: 0 20px; font: inherit; font-size: 13px; font-weight: 500; text-decoration: none; cursor: pointer; transition: background .2s, transform .2s; }
.lost-actions a:hover, .lost-actions button:hover { transform: translateY(-2px); }
.lost-primary { border: 1px solid var(--vp-button-brand-border); background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); }
.lost-primary:hover { border-color: var(--vp-button-brand-hover-border); background: var(--vp-button-brand-hover-bg); color: var(--vp-button-brand-hover-text); }
.lost-primary:active { border-color: var(--vp-button-brand-active-border); background: var(--vp-button-brand-active-bg); color: var(--vp-button-brand-active-text); }
.lost-secondary { border: 1px solid var(--vp-button-alt-border); color: var(--vp-button-alt-text); background: var(--vp-button-alt-bg); }
.lost-secondary:hover { border-color: var(--vp-button-alt-hover-border); background: var(--vp-button-alt-hover-bg); color: var(--vp-button-alt-hover-text); }
.lost-secondary:active { border-color: var(--vp-button-alt-active-border); background: var(--vp-button-alt-active-bg); color: var(--vp-button-alt-active-text); }
.lost-actions :focus-visible, .lost-hint a:focus-visible { outline: 3px solid var(--lost-blue); outline-offset: 4px; }
.lost-hint { margin: 22px 0 0; font-size: 12px; line-height: 1.8; color: var(--lost-muted); }
.lost-hint a { color: var(--lost-blue); text-decoration: none; }
.lost-hint a:hover { text-decoration: underline; }
.lost-art { display: flex; align-items: center; justify-content: center; height: 560px; width: 100%; }
.lost-character { display: block; width: auto; height: 100%; max-width: 100%; object-fit: contain; user-select: none; -webkit-user-drag: none; }
.lost-footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; width: 100%; padding: 22px 0 24px; border-top: 1px solid var(--lost-line); color: var(--lost-muted); font-size: 11px; letter-spacing: .4px; }
.lost-footer-separator { margin: 0 10px; opacity: .5; }
@media (min-width: 1600px) { .lost-layout { padding-top: 48px; padding-bottom: 72px; } }
@media (min-width: 960px) and (max-width: 1099px) {
  .lost-art { height: 500px; }
  .lost-description { max-width: 320px; }
  .lost-desktop-break { display: none; }
  .lost-layout { gap: 0; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 959px) {
  .lost-page { padding: 92px 24px 0; }
  .lost-layout { display: flex; flex-direction: column; gap: 24px; padding: 0 0 24px; }
  .lost-copy { width: 100%; padding: 0; text-align: center; }
  .lost-eyebrow { justify-content: center; margin-bottom: 22px; font-size: 10px; }
  .lost-code { font-size: 110px; letter-spacing: -7px; }
  .lost-kicker { margin: 12px 0 18px; font-size: 9px; letter-spacing: 3.5px; }
  .lost-copy h1 { font-size: 30px; line-height: 1.5; letter-spacing: -.7px; }
  .lost-copy h1 br { display: none; }
  .lost-description { margin-top: 16px; font-size: 12px; line-height: 1.95; }
  .lost-desktop-break { display: none; }
  .lost-actions { justify-content: center; margin-top: 24px; gap: 10px; }
  .lost-actions a, .lost-actions button { min-height: 44px; padding: 0 16px; gap: 12px; font-size: 12px; }
  .lost-hint { margin-top: 16px; font-size: 11px; }
  .lost-art { width: min(320px, 100%); height: 400px; margin-top: 6px; }
  .lost-footer { justify-content: center; padding: 18px 0; text-align: center; font-size: 10px; gap: 8px 24px; }
}
@media (prefers-reduced-motion: reduce) { .lost-actions a, .lost-actions button { transition: none; } .lost-actions a:hover, .lost-actions button:hover { transform: none; } }
</style>
