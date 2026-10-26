import DefaultTheme from "vitepress/theme";
import { defineComponent, h } from "vue";
import { useData } from "vitepress";
import ApiPageName from "./components/ApiPageName.vue";
import BrandNotFound from "./components/BrandNotFound.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    setup() {
      const { page, frontmatter } = useData();
      return () => h(DefaultTheme.Layout, {
        class: {
          "brand-not-found": page.value.isNotFound,
          "brand-home": frontmatter.value.layout === "home",
        },
      }, {
        "home-hero-info-before": () => h("p", { class: "home-eyebrow" }, "插件开发文档"),
        "not-found": () => h(BrandNotFound),
        "doc-before": () => h(ApiPageName),
      });
    },
  }),
};
