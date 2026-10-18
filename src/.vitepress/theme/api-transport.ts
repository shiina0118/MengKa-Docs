import { onMounted, ref } from "vue";

export type ApiTransport = "websocket" | "http";

const transport = ref<ApiTransport>("websocket");
let initialized = false;

// Keep the reader's transport choice when navigating between API pages.
export function useApiTransport() {
  onMounted(() => {
    if (initialized) return;
    initialized = true;
    try {
      if (sessionStorage.getItem("mengka-api-transport") === "http") {
        transport.value = "http";
      }
    } catch { /* Tabs also work when browser storage is unavailable. */ }
  });

  function select(value: ApiTransport) {
    transport.value = value;
    try {
      sessionStorage.setItem("mengka-api-transport", value);
    } catch { /* The current page still switches without storage. */ }
  }

  return { transport, select };
}
