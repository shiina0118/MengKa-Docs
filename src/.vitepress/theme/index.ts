import DefaultTheme from "vitepress/theme";
import { defineComponent, h } from "vue";
import { useData } from "vitepress";
import ApiCallTabs from "./components/ApiCallTabs.vue";
import BrandNotFound from "./components/BrandNotFound.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    setup() {
      const { page } = useData();
      return () => h(DefaultTheme.Layout, {
        class: { "brand-not-found": page.value.isNotFound },
      }, {
        "not-found": () => h(BrandNotFound),
      });
    },
  }),
  enhanceApp({ app }) {
    app.component("ApiCallTabs", ApiCallTabs);
  },
};
