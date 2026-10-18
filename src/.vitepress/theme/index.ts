import DefaultTheme from "vitepress/theme";
import ApiCallTabs from "./components/ApiCallTabs.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ApiCallTabs", ApiCallTabs);
  },
};
